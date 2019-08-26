<template>
    <div id="perContent">
        <p class="perText">权限信息</p>
        <div class="treeBox">
            <el-tree :data="data" show-checkbox node-key="id" default-expand-all :default-checked-keys='resourceCheckedKey' :props="defaultProps" ref="tree">
            </el-tree>
        </div>
        <div class="contentBox">
            <el-button v-if="clickStyle" @click="submitAccount()" type="primary" plain>确认修改</el-button>
            <el-button @click="closeDrawer()" type="info" plain>返回</el-button>
        </div>
    </div>
</template>

<script>
    import { convertAuthor, restTree,noCheckTree } from "@/components/js/initMapTree";
    export default {
        props:["clickStyle"],
        data() {
            return {
                filterText: '',
                count: 1,
                data: [],
                data1: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                breadcrumb:'',
                breadname:'',
                checkList:[],
                resourceCheckedKey:[],
            }
        },
        watch: {
            filterText(val) {
                this.$refs.tree2.filter(val);
            }
        },
        methods: {
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            handleNodeClick(data) {
                console.log(data);
            },
            /**
             * 获取账户userId查询权限
             * @param data
             */
            getAccountFunction(data){
                this.$Api.Accout.getUserById({
                    userId:this.userId,
                }).then(res => {
                    if (res.result == '00000000') {
                        this.data=res.data.authTree;
                        this.$nextTick(function() {
                            if(this.clickStyle){
                                this.resourceCheckedKey=noCheckTree(res.data.authTree);
                            }else {
                                this.resourceCheckedKey=convertAuthor(res.data.authTree);
                            }
                        })
                    } else {
                        this.$message({
                            message: res.data,
                            type: 'error'
                        });
                    }
                });
            },
            //提交账户权限树
            submitAccount(){
                this.getKeys();
                this.$emit("treeChuan",this.aKey);
                // this.$Api.Accout.upDateUserRole({
                //     userId:this.userId,
                //     funcIds:this.aKey,
                // }).then(res => {
                //     if (res.result == '00000000') {
                //         this.$message({
                //             message: "编辑成功",
                //             type: 'success'
                //         });
                //
                //     } else {
                //         this.$message({
                //             message: res.data,
                //             type: 'error'
                //         });
                //     }
                // });
            },

            //获取所有KEY的数组
            getKeys () {
                this.aKey = this.$getCheckedKeys(this.data, this.$refs.tree.getCheckedKeys(), 'id');
                console.log(this.aKey);
            },
            //closeDrawer
            closeDrawer(){
                this.$emit('closeParentDrawer','111');
            },
        },
        mounted(){
            restTree();
            this.userId=this.$store.state.userId;
            this.getAccountFunction(1,10);
            console.log(this.clickStyle);
        },
    };
</script>

<style lang="less" scoped>
    #perContent{
        height: auto;
        background-color: #fff;
        .el-tree {
            position: relative;
            cursor: default;
            color: #606266;
            padding-top: 15px;
        }
        .treeBox {
            width: 100%;
            height: auto;
            float: left;
            display: inline-block;
            border-top: 1px solid #ccc;
        }
        .contentBox{
            position: relative;
            width: 100%;
            height: 50px;
            line-height: 50px;
            text-align: center;
            float: left;
            display: inline-block;
            padding: 10px;
            letter-spacing: 2px;
        }
        .perInfo{
            position: absolute;
            left: 12px;
            top:-15px;
            line-height: 20px;
        }
        .perText{
            text-indent: 20px;
        }
    }
</style>
