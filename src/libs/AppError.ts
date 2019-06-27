module.exports = class AppError extends Error {
    constructor(args){
        super(args);
        this.name = args
    } 
}
