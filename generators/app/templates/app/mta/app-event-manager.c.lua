
local prefix = "AppEvent_"

local addEvent = function(eventName)
    return addEvent(prefix .. eventName, false)
end
local addEventListener = function(eventName, func)
    return addEventHandler(
        prefix .. eventName,
        getResourceRootElement(getThisResource()),
        func
    )
end


AppEventManager = {
        addEvent = addEvent,
        addEventListener = addEventListener
}
