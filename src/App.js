import React, { useState, useEffect, useRef } from "react";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  Button,
} from "@material-ui/core";
import mime from "mime-types";
import ReactImageAnnotate from "./adaptedModules/react-image-annotate";
import v4 from "uuid";
import {
  update,
  query,
  findArtefactRegistry,
  notifyGlobalRegistry,
  notifyMetadataOwnerOfNewLinkElementList,
  getLBDlocation,
  getProjectId,
} from "consolid";
import { getDefaultSession } from "@inrupt/solid-client-authn-browser";
const N3 = require("n3");
const { DataFactory } = N3;
const { namedNode, literal, defaultGraph, quad } = DataFactory;


const newEngine = require("@comunica/actor-init-sparql").newEngine;
const generateClassname = createGenerateClassName({
  productionPrefix: "img_a",
  // disableGlobal: true,
  seed: "img_a",
});

function Plugin(props) {
  const { sharedProps, module, inactive } = props;
  const {
    selectedElements,
    activeResources,
    projects,
    store,
    session,
    trigger,
  } = sharedProps;
  const [artefactRegistry, setArtefactRegistry] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [stateKey, setStateKey] = useState(v4());
  const [allowedClasses, setAllowedClasses] = useState([]);
  const [enabledTools, setEnabledTools] = useState([]);
  const [myResources, setMyResources] = useState([]);
  const [writingResource, setWritingResource] = useState("")
  const project = projects[0];

  useEffect(() => {
    const imageResources = [...activeResources]
      .filter((res) => {
        // could be done asynchronously by looking up mimetype in 'meta'data
        const mimetype = mime.lookup(res.main);
        return mimetype.includes("image");
      })
      .map((item) => {
        // // only open photo's ...
        // const photo  = await session.fetch(item)
        // console.log("photo", await photo.blob())
        return {
          src: item.main,
          metadata: item.metadata,
          artefactRegistry: item.artefactRegistry,
          name: item.main.split("/")[item.main.split("/").length - 1],
          regions: [],
        };
      });
    if (JSON.stringify(imageResources) === JSON.stringify(images)) {
      return;
    }
    setImages(imageResources);
    // for (const img of imageResources) {
    //   getRegions(img.src) 
    // }
    setSelectedImage(0);
    setStateKey(v4());
    //  myEngine.invalidateHttpCache()
  }, [activeResources]);

  useEffect(() => {
    if (session.info.isLoggedIn) {
      getMyArtefactRegistry();
      setAllowedClasses([...allowedClasses, session.info.webId]);
      setEnabledTools([
        "select",
        "create-box",
        "create-polygon",
        "create-line",
        "show-mask",
      ]);
      setStateKey(v4());
    } else {
      setAllowedClasses([]);
    }
  }, [trigger]);

  useEffect(() => {
    if (images[selectedImage]) {
      const imgs = images;
      imgs[selectedImage].regions = [];
      setImages(imgs);
      setStateKey(v4());
    }
  }, [selectedElements])
  // useEffect(() => {
  //   getRegions(images[selectedImage])
  // }, [selectedImage]);

  async function getAssociatedRegions(image) {
    const myEngine = newEngine();
    const regions = []
    const creators = {}

    for (const art of selectedElements) {
      const q = `
      PREFIX lbd: <https://lbdserver.org/vocabulary#> 
      SELECT ?region WHERE {
        <${art.global[0]}> lbd:hasLinkElement ?le .
        ?le lbd:hasIdentifier ?id ;
            lbd:hasDocument <${image.src}> .
        ?id lbd:identifier ?region .
      }`;
      const results1 = await myEngine.query(q, { sources: [...activeResources.map(e => e.artefactRegistry), artefactRegistry] });
      const bindings1 = await results1.bindings();
      bindings1.forEach((item) => {
        const creator = art.global[0].split("lbd")[0] + "profile/card#me";
  
        let color
        if (!Object.keys(creators).includes(creator)) {
          color = getRandomColor()
          creators[creator] = {color}
        } else {
          color = creators[creator].color
        }
  
        regions.push({
          ...JSON.parse(
            item
              .get("?region")
              .id.replaceAll('"', "")
              .replaceAll("'", '"')
          ),
          artefact: art.global[0],
          cls: creator,
          color,
          id: v4(),
          tags: [art.global[0]],
          loaded: true,
        });
      });


    }

    const imgs = images;
    imgs[selectedImage].regions = regions;
    setImages(imgs);
    setAllowedClasses((ca) => [...ca, ...Object.keys(creators)]);
    setStateKey(v4());
  }

  async function getRegions(image) {
    console.log(`image`, image);
    const myEngine = newEngine();
    const q = `
     PREFIX lbd: <https://lbdserver.org/vocabulary#> 
     SELECT ?region ?artefact WHERE {
       ?artefact lbd:hasLinkElement ?le .
       ?le lbd:hasIdentifier ?id ;
           lbd:hasDocument <${image.src}> .
       ?id lbd:identifier ?region .
     }`;
    const results1 = await myEngine.query(q, { sources: [store] });
    const bindings1 = await results1.bindings();
    const creators = {}
    const zones = bindings1.map((item) => {
      const artefact = item.get("?artefact").id
      const creator = artefact.split("lbd")[0] + "profile/card#me";

      let color
      if (!Object.keys(creators).includes(creator)) {
        color = getRandomColor()
        creators[creator] = {color}
      } else {
        color = creators[creator].color
      }

      return {
        ...JSON.parse(
          item
            .get("?region")
            .id.replaceAll('"', "")
            .replaceAll("'", '"')
        ),
        artefact,
        cls: creator,
        color,
        id: v4(),
        tags: [artefact],
        loaded: true,
      };
    });
    console.log(`zones`, zones);
    const imgs = images;
    imgs[selectedImage].regions = zones;
    setImages(imgs);
    setAllowedClasses((ca) => [...ca, ...Object.keys(creators)]);
    setStateKey(v4());
  }

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  async function getRegionsOld() {
    const myEngine = newEngine();
    const regions = [];
    for (const el of selectedElements) {
      ///////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////QUERY DAMAGES//////////////////////////
      ///////////////////////////////////////////////////////////////////////////

      //find references of the global element in the global artefactregistry
      const q1 = `PREFIX dct: <http://purl.org/dc/terms/> SELECT ?ref WHERE {<${el.global}> dct:isReferencedBy ?ref}`;
      const results1 = await myEngine.query(q1, { sources: [store] });
      const bindings1 = await results1.bindings();
      const sources1 = bindings1.map((item) => item.get("?ref").id);
      // find local identifiers and their documents in the newSources (i.e. linkelements)
      const q2 = `
    PREFIX lbd: <https://lbdserver.org/vocabulary#>
    SELECT ?source ?id WHERE {
      <${el.global}> lbd:hasLinkElement ?le .
      ?le lbd:hasDocument ?source ;
      lbd:hasIdentifier ?identifier .
      ?identifier lbd:identifier ?id ; a lbd:URIBasedIdentifier .
    }
    `;
      const results2 = await myEngine.query(q2, { sources: sources1 });
      const bindings2 = await results2.bindings();
      const sourceWithId = bindings2.map((item) => {
        return { document: item.get("?source").id, id: item.get("?id").id };
      });

      console.log(`sourceWithId`, sourceWithId);
      // do the actual "semantic query" => if this becomes a generic function, this is the most important one ;)
      const damages = [];
      for (const data of sourceWithId) {
        const q3 = `
      PREFIX dot: <https://w3id.org/dot#>
      SELECT ?dam WHERE {
        <${data.id}> dot:hasDamageArea ?dam .
      }
      `;
        const results3 = await myEngine.query(q3, { sources: [data.document] });
        const bindings3 = await results3.bindings();
        bindings3
          .map((item) => item.get("?dam").id)
          .forEach((item) => damages.push({ item, source: data.document }));
      }

      console.log(`damages`, damages);

      // find global artefact for each damage
      const globalDamages = [];
      for (const damage of damages) {
        const q4 = `
      PREFIX lbd: <https://lbdserver.org/vocabulary#>
      SELECT ?global WHERE {
        ?global lbd:hasLinkElement ?le .
        ?le lbd:hasDocument <${damage.source}> ;
        lbd:hasIdentifier ?identifier .
        ?identifier lbd:identifier <${damage.item}> .
      }
      `;
        const results4 = await myEngine.query(q4, { sources: sources1 });
        const bindings4 = await results4.bindings();
        bindings4
          .map((item) => item.get("?global").id)
          .forEach((item) => globalDamages.push(item));
      }

      console.log(`globalDamages`, globalDamages);
      for (const globDam of globalDamages) {
        const q5 = `
      PREFIX lbd: <https://lbdserver.org/vocabulary#>
      SELECT ?id
      WHERE {
        <${globDam}> lbd:hasLinkElement ?le .
        ?le lbd:hasDocument <${images[selectedImage].src}> ;
        lbd:hasIdentifier ?identifier .
        ?identifier lbd:identifier ?id .
      }
      `;
        const results5 = await myEngine.query(q5, {
          sources: linkElementSources,
        });
        const bindings5 = await results5.bindings();
        for (const b of bindings5) {
          let region = b.get("?id").id;
          region = region.replaceAll('"', "");
          region = region.replaceAll("'", '"');
          regions.push(JSON.parse(region));
        }
      }
    }

    images[selectedImage].regions = regions;
    setImages(images);
    setStateKey(v4());
    //  myEngine.invalidateHttpCache()
  }

  // async function getMyFiles() {
  //   const myEngine = newEngine();
  //   const q = `prefix ldp: <http://www.w3.org/ns/ldp#> select ?res where {?c a ldp:Container; ldp:contains ?res .}`;
  //   const result = await myEngine.query(q, { sources: [project] });
  //   const res = await result.bindings();
  //   const myFiles = res.map((item) => {
  //     return item.get("?res").id;
  //   });
  //   setMyResources(myFiles);
  // }

  async function getMyArtefactRegistry() {
    console.log(`session.info.webId`, session.info.webId);
    const LBDlocation = await getLBDlocation(session.info.webId, session);
    const projectId = await getProjectId(project, session);
    console.log(`LBDlocation`, LBDlocation);
    const ar = LBDlocation + projectId + "/artefactRegistry.ttl";
    setArtefactRegistry(ar);
  }

  if (inactive || images.length === 0) return <></>;

  async function saveAll(e) {
    if (artefactRegistry) {
      console.log(`artefactRegistry`, artefactRegistry);
      for (const image of e.images) {
        for (const region of image.regions) {
          if (!region.loaded) {
            console.log(`region`, region);
            const type = region.type;
            let saveString;
            if (type === "box") {
              saveString = {
                type,
                x: region.x,
                y: region.y,
                w: region.w,
                h: region.h,
              };
            } else {
              saveString = { type, points: region.points };
            }

            const zoneId = v4();
            const linkElement = v4();
            const identifier = v4();

            const query = `
        PREFIX lbd: <https://lbdserver.org/vocabulary#> 
        INSERT DATA {
          <#${zoneId}> lbd:hasLinkElement <#${linkElement}> .
          <#${linkElement}> lbd:hasIdentifier <#${identifier}> ;
              lbd:hasDocument <${image.src}> .
          <#${identifier}> lbd:identifier "${JSON.stringify(
              saveString
            ).replaceAll('"', "'")}" .
        }`;

            await update(query, artefactRegistry, session);

            store.addQuad(
              namedNode(artefactRegistry + `#${zoneId}`),
              namedNode(`https://lbdserver.org/vocabulary#hasLinkElement`),
              namedNode(artefactRegistry + `#${linkElement}`)
            );
            store.addQuad(
              namedNode(artefactRegistry + `#${linkElement}`),
              namedNode(`https://lbdserver.org/vocabulary#hasIdentifier`),
              namedNode(artefactRegistry + `#${identifier}`)
            );
            store.addQuad(
              namedNode(artefactRegistry + `#${linkElement}`),
              namedNode(`https://lbdserver.org/vocabulary#hasDocument`),
              namedNode(image.src)
            );
            store.addQuad(
              namedNode(artefactRegistry + `#${identifier}`),
              namedNode(`https://lbdserver.org/vocabulary#identifier`),
              literal(JSON.stringify(region).replaceAll('"', "'"))
            );

          if (selectedElements.length > 0) {
            for (const elem of selectedElements) {
              const q = `
              PREFIX lbd: <https://lbdserver.org/vocabulary#> 
              PREFIX owl: <http://www.w3.org/2002/07/owl#>
              INSERT DATA {
                <#${zoneId}> owl:sameAs <${elem.global[0]}> .
                <${elem.global[0]}> owl:sameAs <#${zoneId}> .
              }`;
      
                  await update(q, artefactRegistry, session);
                }
            }


          }


          // switch (region.cls) {
          //   case "Building Element":
          //     await createBuildingElementLink(
          //       saveString,
          //       {
          //         resource: image.src,
          //         metadata: image.metadata,
          //         linkElements: image.linkElements,
          //       },
          //       selectedElements[selectedElements.length - 1]
          //     );
          //     break;
          //   case "Damage":
          //     await createDamageInstanceAndLink(
          //       region,
          //       writingResource,
          //       {
          //         resource: image.src,
          //         metadata: image.metadata,
          //         linkElements: image.linkElements,
          //       },
          //       selectedElements[selectedElements.length - 1]
          //     );
          //     break;
          //   default:
          //     return;
          // }
        }
      }
    }
  }

  async function createBuildingElementLink(region, source, element) {
    // the main link element registry is the one you own yourself :) So it should be filtered out
    const myLinkElements = source.linkElements.filter((item) =>
      myResources.includes(item)
    );
    let myLinkElement;
    if (myLinkElements.length === 0) {
      // you have no linkElementRegistry for this resource yet
      myLinkElement =
        project.local + `externalReference_${v4()}.linkElements.ttl`;
    } else {
      // you already have a linkElementRegistry for this resource (and THERE CAN BE ONLY ONE!!)
      myLinkElement = myLinkElements[0];
    }

    // create new LinkElement in linkElements of image
    const le = v4();
    const updateQ = `
    PREFIX lbd: <https://lbdserver.org/vocabulary#>
    PREFIX dct:  <http://purl.org/dc/terms/>
    PREFIX dcat: <http://www.w3.org/ns/dcat#>
    PREFIX inst: <${myLinkElement}#>

    INSERT DATA {
    <${element.global}> lbd:hasLinkElement  inst:le_${le} .
    inst:le_${le} lbd:hasDocument <${source.main}> ;
      lbd:hasIdentifier inst:identifier_${id} ;
    inst:identifier_${id} a lbd:StringBasedIdentifier; 
      lbd:identifier "${JSON.stringify(region).replaceAll('"', "'")}".
    }`;
    await update(updateQ, myLinkElement, session);
    await notifyGlobalRegistry(
      element,
      [myLinkElement],
      project.global.replace("/profile/card#me", "/data/artefactRegistry.ttl"),
      session
    );

    await notifyMetadataOwnerOfNewLinkElementList(
      myLinkElement,
      source.main,
      source.metadata,
      session
    );
  }

  async function createDamageInstanceAndLink(
    region,
    semanticSource,
    imageSource,
    element
  ) {
    const globalRegistry = project.global.replace(
      "/profile/card#me",
      "/data/artefactRegistry.ttl"
    );

    // the main link element registry is the one you own yourself :) So it should be filtered out
    const myLinkElements = imageSource.linkElements.filter((item) =>
      myResources.includes(item)
    );
    let myLinkElement;
    if (myLinkElements.length === 0) {
      // you have no linkElementRegistry for this resource yet
      myLinkElement =
        project.local + `externalReference_${v4()}.linkElements.ttl`;
    } else {
      // you already have a linkElementRegistry for this resource (and THERE CAN BE ONLY ONE!!)
      myLinkElement = myLinkElements[0];
    }

    // the main link element registry is the one you own yourself :) So it should be filtered out
    console.log(`semanticSource`, semanticSource);
    const myGraphLinkElements = semanticSource.linkElements.filter((item) =>
      myResources.includes(item)
    );
    let myGraphLinkElement;
    if (myGraphLinkElements.length === 0) {
      // you have no linkElementRegistry for this resource yet
      myGraphLinkElement =
        project.local + `externalReference_${v4()}.linkElements.ttl`;
    } else {
      // you already have a linkElementRegistry for this resource (and THERE CAN BE ONLY ONE!!)
      myGraphLinkElement = myGraphLinkElements[0];
    }

    const damId = v4();
    const le1 = v4();
    const id1 = v4();
    const le2 = v4();
    const id2 = v4();
    const le3 = v4();
    const id3 = v4();
    const glob = v4();
    const locEl = v4();

    // create new damage instance in new TTL graph or existing one (add dropdown to select among active graph resources)
    const updateQ1 = `
    PREFIX lbd: <https://lbdserver.org/vocabulary#>
    PREFIX dot:  <https://w3id.org/dot#>
    PREFIX dcat: <http://www.w3.org/ns/dcat#>
    PREFIX inst: <${semanticSource.main}#>

    INSERT DATA {
    inst:el_${locEl} dot:hasDamageArea inst:dam_${damId} .
    inst:dam_${damId} a dot:DamageArea, dot:Damage .
    }`;
    await update(updateQ1, semanticSource.main, session);

    const updateQ2 = `
    PREFIX lbd: <https://lbdserver.org/vocabulary#>
    PREFIX dot:  <https://w3id.org/dot#>
    PREFIX dcat: <http://www.w3.org/ns/dcat#>
    PREFIX inst: <${myGraphLinkElement}#>
    PREFIX glob: <${globalRegistry}#>

    INSERT DATA {
    <${element.global}> lbd:hasLinkElement inst:le_${le1} .
    inst:le_${le1} lbd:hasIdentifier inst:id_${id1} ;
    lbd:hasDocument <${semanticSource.main}> .
    inst:id_${id1} a lbd:URIBasedIdentifier ; 
      lbd:identifier <${semanticSource.main}#el_${locEl}> .

    glob:artefact_${glob} lbd:hasLinkElement inst:le_${le2} .
      inst:le_${le2} lbd:hasIdentifier inst:id_${id2} ; lbd:hasDocument <${semanticSource.main}> .
      inst:id_${id2} a lbd:URIBasedIdentifier ; 
        lbd:identifier <${semanticSource.main}#dam_${damId}> .
    }`;
    await update(updateQ2, myGraphLinkElement, session);

    await notifyGlobalRegistry(
      element,
      [myGraphLinkElement],
      project.global.replace("/profile/card#me", "/data/artefactRegistry.ttl"),
      session
    );

    const updateQ3 = `
    PREFIX lbd: <https://lbdserver.org/vocabulary#>
    PREFIX dot:  <https://w3id.org/dot#>
    PREFIX dcat: <http://www.w3.org/ns/dcat#>
    PREFIX inst: <${myLinkElement}#>
    PREFIX glob: <${globalRegistry}#>

    INSERT DATA {
    glob:artefact_${glob} lbd:hasLinkElement inst:le_${le3} .
      inst:le_${le3} lbd:hasIdentifier inst:id_${id3} ; lbd:hasDocument <${
      imageSource.main
    }>.
      inst:id_${id3} a lbd:StringBasedIdentifier ;
        lbd:identifier "${JSON.stringify(region).replaceAll('"', "'")}".
    }`;
    await update(updateQ3, myLinkElement, session);

    await notifyGlobalRegistry(
      { global: globalRegistry + `#artefact_${glob}` },
      [myGraphLinkElement, myLinkElement],
      project.global.replace("/profile/card#me", "/data/artefactRegistry.ttl"),
      session
    );
    await notifyMetadataOwnerOfNewLinkElementList(
      [myLinkElement],
      imageSource.main,
      imageSource.metadata,
      session
    );
    await notifyMetadataOwnerOfNewLinkElementList(
      [myGraphLinkElement],
      semanticSource.main,
      semanticSource.metadata,
      session
    );
  }

  async function handleNextImage(e) {
    console.log(`e`, e);
    if (selectedImage < images.length) {
      setSelectedImage((e) => e + 1);
    }
    setStateKey(v4());
  }

  async function handlePreviousImage(e) {
    console.log(`e`, e);
    if (selectedImage > 0) {
      setSelectedImage((e) => e - 1);
    }
    console.log(e.images[selectedImage]);
    setStateKey(v4());
  }

  return (
    <div
      id={stateKey}
      style={{
        width: module.dimensions.w - 2,
        height: module.dimensions.h - 100,
      }}
    >
      <StylesProvider generateClassName={generateClassname}>
        {/* adapt events via MainLayout module (pass functions via Annotator component) */}
        <ReactImageAnnotate
          key={stateKey}
          selectedImage={selectedImage}
          onSelectRegion={(e) => console.log("region", e)}
          images={images}
          regionClsList={allowedClasses}
          showTags={true}
          onExit={(e) => saveAll(e)}
          enabledTools={enabledTools}
          allowComments={true}
          onNextImage={handleNextImage}
          onPrevImage={handlePreviousImage}
          hideNext={selectedImage < images.length - 1 ? false : true}
          hidePrev={selectedImage === 0 || images.length < 2 ? true : false}
        />
        <Button variant="contained" color="primary" onClick={() => getRegions(images[selectedImage])}>
          Get all zones
        </Button>
        <Button variant="contained" color="primary" onClick={() => getAssociatedRegions(images[selectedImage])}>
          Get associated regions
        </Button>

        {/* {(session.info.isLoggedIn && artefactRegistry && selectedElements.length > 0) ? (
          <FormControl style={{ margin: 20 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Resource
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              fullWidth
              value={writingResource}
              onChange={(e) => setWritingResource(e.target.value)}
            >
              {selectedElements
                .map((item) => {
                  return (
                    <MenuItem key={item.global} value={item}>
                      {item.global}
                    </MenuItem>
                  );
                })}
            </Select>
            <FormHelperText>
              Link to element
            </FormHelperText>
            <Button onClick={() => createGlobalArtefactsFromGltf(project, resource, session)}>Align GUIDs</Button>
          </FormControl>
        ) : (
          <></>
        )} */}
      </StylesProvider>
    </div>
  );
}

export default Plugin;
