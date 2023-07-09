
local stringToLua = function(data)
    local func, err = loadstring("return "..data)
    if(func)then 
        local parsedString = func();
        return parsedString;
    else 
        return false;
    end 
end 

AppUtilities = {
    stringToLua = stringToLua
}