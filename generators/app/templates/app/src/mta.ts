
const triggerEvent = (eventName:string, ...args:any)=>{
    try {
        mta.triggerEvent(`AppEvent_${eventName}`, ...args);
    } catch (error) {
        console.log(error);
    }
}

export const MTA={
    triggerEvent
}