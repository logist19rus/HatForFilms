import { mainRepository } from './../Repository/mainRepository'

export class HatRepository extends mainRepository {
    async getMy() {
        return await this.request('/api/Hats/GetMy', true, null, true, null);
    }

    async createHatForMe() {
        return await this.request('/api/Hats/CreateForMe', false, null, true, null);
    }

    async getSingle(id) {
        let param = [];
        param.push({ name: "hatId", val: id });
        return await this.request('/api/Hats/GetSingle', true, param, true, null);
    }

    async addNewFilm(hatId, filmId) {
        let param = [];
        param.push({ name: "hatId", val: hatId });
        param.push({ name: "filmId", val: filmId });
        return await this.request('/api/FiH/addNew', false, param, true, null);
    }

    async changeMember(hatId, memberId) {
        let param = [];
        param.push({ name: "hatId", val: hatId });
        param.push({ name: "memberId", val: memberId });
        return await this.request('/api/Hats/MemberSet', false, param, true, null);
    }
}