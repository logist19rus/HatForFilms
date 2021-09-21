import { mainRepository } from './../Repository/mainRepository'

export class FilmRepository extends mainRepository {
    async getAll() {
        return await this.request('api/Films/GetAll', true, null, false, null);
    }

    async createNew(name) {
        let params = [];
        params.push({ name: 'filmName', val: name });
        return await this.request('api/Films/AddNew', false, params, true, null);
    }

    async searchByName(name) {
        let params = [];
        params.push({ name: 'filmName', val: name });
        return await this.request('api/Films/Find', true, params, false, null);
    }

    async updateFilm(film) {
        return await this.request('api/Films/Update', false, null, true, film);
    }
}
