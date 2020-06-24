const utils = {
    getDataFromDoc(doc) {
        let data = doc.data()
        data.id = doc.id
        return data
    },
    getDataFromDocs(docs) {
        return docs.map(this.getDataFromDoc)
    },
    validateData: (condition, errorTag, messageError) => {
        if (condition) {
            document.querySelector(errorTag).innerHTML = ''
            return true
        }
        document.querySelector(errorTag).innerHTML = messageError
        return false
    },
    checkValidData: (array) => {
        return array.every((item) => {
            return item
        })
    },
    setText: (idtag, text) => {
        document.querySelector(idtag).innerHTML = text
    },
    enableButton: (idtag) => {
        document.querySelector(idtag).removeAttribute('disabled')
    },
    disabledButton: (idtag) => {
        document.querySelector(idtag).setAttribute('disabled', true)
    },
    formatDate: (date) => {
        return new Date(date).toLocaleDateString()
    },
    validateSearch(condition, messageError) {
        if (condition) {
            return true
        }
        alert(messageError)
        return false
    },
    sortByTime: (a, b) => {
        const createA = new Date(a.CreateAt).toLocaleString();
        const createB = new Date(b.CreateAt).toLocaleString();

        let comparison = 0;
        if (createA > createB) {
            comparison = 1;
        } else if (createA < createB) {
            comparison = -1;
        }
        return comparison;
    }
}