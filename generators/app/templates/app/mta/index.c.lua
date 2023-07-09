

-- This code is a test, you can modify this file and put your own client-side code here.

local resourceName = getResourceName(getThisResource());

addEventHandler( "onClientResourceStart", getRootElement(  ), 
function()
   BrowserManager.show(); -- show the app
   BrowserManager.onInit(
    function()
        outputChatBox( "MTA App " ..resourceName .. " loaded!" );
    end
   )
end)
-- ==========================================================================