/**
 * author : Sudeera Madushan
 * date : 1/13/2024
 * project : food-delivery-back-end
 */
export default class CustomResponse {
    private _status: number;
    private _massage: string;
    private _data ? : any;
    private _pages ? : number;

    toJSON() {
        return {
            status: this._status,
            massage: this._massage,
            data: this._data,
            pages: this._pages
        }
    }

    constructor(status: number, massage: string, data?: any, pages?: number) {
        this._status = status;
        this._massage = massage;
        this._data = data;
        this._pages = pages;
    }


    get pages(): any {
        return this._pages;
    }

    set pages(value: any) {
        this._pages = value;
    }

    get status(): number {
        return this._status;
    }

    set status(value: number) {
        this._status = value;
    }

    get massage(): string {
        return this._massage;
    }

    set massage(value: string) {
        this._massage = value;
    }

    get data(): any {
        return this._data;
    }

    set data(value: any) {
        this._data = value;
    }
}
