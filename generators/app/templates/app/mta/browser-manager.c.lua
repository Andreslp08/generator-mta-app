local resourceName = getResourceName(getThisResource())
browserWindow = nil
browser = nil
local WIDTH = 1
local HEIGHT = 1;
local X = 0;
local Y = 0;
local APP_HTML_INDEX_URL =  "http://mta/" .. resourceName .. "/app/dist/index.html";


local function show()
    showCursor(true)
    showChat( false )

    if (browserWindow ~= nil and browserWindow and isElement(browserWindow)) then
        destroyElement(browserWindow)
        browser = nil
    end
    browserWindow = guiCreateBrowser(X, Y, WIDTH, HEIGHT, true, true, true)
    browser = guiGetBrowser(browserWindow)
    guiBringToFront(browserWindow)
    -- setMovable(browserWindow, false)
    addEventHandler(
        "onClientBrowserCreated",
        browser,
        function()
            loadBrowserURL(source, APP_HTML_INDEX_URL)
        end
    )
end

local function hide()
    showChat( true )
    showCursor(false)
    if (isElement(browserWindow)) then
        destroyElement(browserWindow);

    end

    PreviewMode().finish();
end

local function onInit(callback)
    if (callback and browser) then
        addEventHandler(
            "onClientBrowserDocumentReady",
            browser,
            function()
                if (callback) then
                    callback(browser)
                end
            end
        )
    end

end

BrowserManager = {
    show = show,
    hide = hide,
    onInit = onInit
}
