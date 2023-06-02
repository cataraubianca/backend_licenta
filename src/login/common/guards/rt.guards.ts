import { AuthGuard } from "@nestjs/passport";

export class rtGuards extends AuthGuard('jwt-refresh'){
    constructor(){
        super();
    }
}