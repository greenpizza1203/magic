import {enableMouseover} from "./mouseover";
import {prepareSearch} from "../fuzzy";


chrome.runtime.onMessage.addListener(prepareSearch);
enableMouseover();







