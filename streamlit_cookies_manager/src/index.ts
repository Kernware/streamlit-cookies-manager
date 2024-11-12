import {RenderData, Streamlit} from "streamlit-component-lib"

const targetWindow: Window = window.parent || window
const targetDocument = targetWindow.document

let lastValue: string | null = null

interface AddCookieSpec {
    value: string
    expires_at: string
    path: string
}

interface DeleteCookieSpec {
    value: null
    path: string
}

type CookieSpec = AddCookieSpec | DeleteCookieSpec

function onRender(event: Event): void {
    const data = (event as CustomEvent<RenderData>).detail

    saveCookies(data.args["queue"])

    if (data.args['resetAll'])
    {
        Streamlit.setComponentValue("")
        return;
    }

    const newValue = targetDocument.cookie
    if (lastValue !== newValue && !data.args.saveOnly) {
        Streamlit.setComponentValue(newValue)
        lastValue = newValue
    }
}

Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, onRender)
Streamlit.setComponentReady()
Streamlit.setFrameHeight(0)


function saveCookies(queue: { [k in string]: CookieSpec }) {
    Object.keys(queue).forEach((name) => {
        const spec = queue[name]
        if (spec.value === null || spec.value == "") {
            // console.log("Delete cookie: '" + name + "'")
            targetDocument.cookie = `${encodeURIComponent(name)}=; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${encodeURIComponent(spec.path)}`;
        }
        else {
            // console.log("Save cookie: '" + name + "'")
            const date = new Date(spec.expires_at)
            targetDocument.cookie = (
                `${encodeURIComponent(name)}=${encodeURIComponent(spec.value)};` +
                ` expires=${date.toUTCString()};` +
                ` path=${encodeURIComponent(spec.path)};`
            )
        }
    })
}