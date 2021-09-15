import http from "../http/http-commons";

class UploadFilesService {
    upload(file, onUploadProgress) {
        let formData = new FormData();
        formData.append("file", file);
        return http.post("/files/upload", formData, {
            headers: {
            "Content-Type": "multipart/form-data",
            },
            onUploadProgress,
        });
    }

    uploadFile(file,token,onUploadProgress) {
        let formData = new FormData();
        formData.append("file", file);
        return http.post("/files/upload/file", formData, {
            headers: {
            "Content-Type": "multipart/form-data",
            "auth-token":token
            },
            onUploadProgress,
        });
    }
}

export default new UploadFilesService();