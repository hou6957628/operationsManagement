<template>
<div class="dataBox">
    <div>加载数据</div>
    <div v-text="{dataList}"></div>
</div>
</template>

<script>
export default {
    name: "fetchData",
    data() {
        return {
            dataList: []
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            this.$http.approval
            .loadSuiteType({})
            .then(res => {
                this.dataList = res
            });
        },
    },
    
}
</script>
<style lang="less" scoped>
.dataBox{
    width: 600px; margin: 20px auto;
}
</style>
