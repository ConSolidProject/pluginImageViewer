import {atom} from 'recoil'
import {Session, getDefaultSession} from "@inrupt/solid-client-authn-browser"
const N3 = require("n3");

const session = atom({
    key: "session",
    default: getDefaultSession()
})


const store = atom({
    key: "store", 
    default: new N3.Store()
})


const projects = atom({
    key: "projects",
    default: ["https://pod.lbdserver.org/arch/lbd/duplex/"]
})

const datasets = atom({
    key: "activeResources",
    default: ["https://pod.lbdserver.org/arch/lbd/duplex/local/datasets/v5AZVWtMdrcoC7CVmHY5KA/24eaXy15hhPM89ngqx6YAm"]
})

const selectedElements = atom({
    key: "selectedElements",
    default: []
})

const selectionId = atom({
    key: "selectionId",
    default: ""
})

const trigger = atom({
    key: "trigger",
    default: '0'
})

export {session, projects, datasets, selectedElements, selectionId, trigger, store}