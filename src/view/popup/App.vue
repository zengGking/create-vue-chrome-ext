<template>
    <h1>{{extName}}</h1>
    <h2>{{extDescription}}</h2>
</template>
<script>
export default {
    created() {
        this.extName=chrome.i18n.getMessage("extName");
        this.extDescription=chrome.i18n.getMessage('extDescription');
    },
    data(){
        return{
            extDescription:'',
            extName:''
        }
    }
}
</script>
<style lang="scss">
body {
    width: 300px;
}

h1 {
    text-align: center;
}

h2 {
    color: blueviolet;
    text-align: center;
}
</style>
  