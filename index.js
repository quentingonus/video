new Vue({
    el: '.root',
    data: {
        cf: null,
        prevFolder: "root/",
        mainfolder: "3000138a-1c2d-4acb-b666-ceb966d59f24",
        api: "EQoxr5zYQI2hRwO3xO7dxyjhwMZcplwh",
        video: null,
        cf: null
    },
    computed: {
        currentfolder() {
            if (!this.cf) {
                return null;
            }
            else {
                const objkey = Object.keys(this.cf);
                let tmparr = { "folders": [], "files": [] };
                for (i = 0; i < objkey.length; i++) {
                    if (this.cf[objkey[i]].type == "file") {
                        tmparr.files.push({
                            "createTime": this.cf[objkey[i]].createTime,
                            "downloadCount": this.cf[objkey[i]].downloadCount,
                            "id": this.cf[objkey[i]].id,
                            "link": this.cf[objkey[i]].link,
                            "name": this.cf[objkey[i]].name,
                            "size": this.cf[objkey[i]].size,
                            "type": "file"
                        });
                    } else {
                        tmparr.folders.push({
                            "childs": this.cf[objkey[i]].childs,
                            "createTime": this.cf[objkey[i]].createTime,
                            "id": this.cf[objkey[i]].id,
                            "name": this.cf[objkey[i]].name,
                            "type": "folder"
                        });
                    }
                }
                console.log(tmparr);
                return tmparr;
            }
        },
        videoSize() {
            if (this.video) {
                tmpsize = this.video.size;
                tmpsize2 = 0;
                rate = 1000;

                tmpsize2 = (tmpsize / rate).toFixed(2);
                if (tmpsize2 < 1000) {
                    return tmpsize2 + " KB"
                }

                tmpsize2 = (tmpsize / (rate * rate)).toFixed(2);
                if (tmpsize2 < 1000) {
                    return tmpsize2 + " MB"
                }

                tmpsize2 = (tmpsize / (rate * rate * rate)).toFixed(2);
                if (tmpsize2 < 1000) {
                    return tmpsize2 + " GB"
                }
            }
            return "";
        },
        videoName() {
            if (this.video) {
                let tmpName = this.video.name;
                tmpName = tmpName.replace(".mp4", "");
                tmpName = tmpName.replace(".mkv", "");
                return tmpName;
            }
            return "";
        }
    },
    methods: {
        listfolder(fid, folder) {
            if (folder != null && this.prevFolder == "root/") {
                this.prevFolder = `root/${folder.name}/`
            } else if (folder != null && this.prevFolder != "root/") {
                this.prevFolder += `/${folder.name}/`
            }
            const id = folder == null ? fid : folder.id;
            console.log("Listing " + id);
            link = `https://api.gofile.io/getFolder?folderId=${id}&token=${this.api}&cache=true`;
            axios.get(link)
                .then(({ data }) => { this.cf = data.data.contents })
        },
        download(id) {
            this.video = null;
            this.countdown = true;
            // console.log("Downloading : " + id);
            // link = "./api.php";
            // axios.post(link, { fileid: id })
            //     .then(({ data }) => {
            //         console.log(data.result);
            //         this.video = data.result;
            //         this.countdown = false;
            //     })
        },
        playthis(vid) {
            this.video = vid;
        }
    },
    created() {
        this.listfolder(this.mainfolder, null);
    }

});