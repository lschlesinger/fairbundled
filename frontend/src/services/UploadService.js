export default class UploadService {


    constructor() {
    }


    static getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    static customRequest = (option) => {
        let e = 0;
        const interval = setInterval(() => {
            e += 10;
            option.onProgress({percent: e, total: 100, loaded: e});
            if (e >= 100) {
                window.clearInterval(interval);
            }
        }, 5);

        setTimeout(() => {
            return option.onSuccess(option.data);
        }, 500);

        return {
            abort() {
            },
        };
    };
}
