<template>
<div class="main">
    <el-button @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button>&nbsp;
    <el-button @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>
    <el-button @click="open1">点击打开 Message Box</el-button>
    <el-button @click="open2">确认消息</el-button>
    <el-dialog title="your-title" :visible.sync="dialogTableVisible">
        <el-table :data="gridData">
            <el-table-column property="date" label="日期" width="150"></el-table-column>
            <el-table-column property="name" label="姓名" width="200"></el-table-column>
            <el-table-column property="address" label="地址"></el-table-column>
        </el-table>
    </el-dialog>
    <el-dialog title="your-title" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="活动名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
    </el-dialog>
    <div style="margin-top:20px;">
        <el-button :plain="true" @click="open">打开消息提示</el-button>
        <el-button :plain="true" @click="openVn">VNode</el-button>
    </div>
    <div style="line-heiht:80px;">
        <el-button>默认按钮</el-button>
        <el-button type="primary">主要按钮</el-button>
        <el-button plain disabled>朴素按钮</el-button>
        <el-button type="primary" plain disabled>主要按钮</el-button>
        <el-button type="text">文字按钮</el-button>
        <el-button type="text" disabled>文字按钮</el-button>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
        <el-button type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
        <el-button type="primary" :loading="true">加载中</el-button>
        <el-button>默认按钮</el-button>
        <el-button size="medium">中等按钮</el-button>
        <el-button size="small">小型按钮</el-button>
        <el-button size="mini">超小按钮</el-button>
        <el-tag>标签一</el-tag>
        <el-tag type="success">标签二</el-tag>
        <el-tag type="info">标签三</el-tag>
        <el-tag type="warning">标签四</el-tag>
        <el-tag type="danger">标签五</el-tag>
    </div>

    <div style="margin-top:20px;">
        图片 svg：
        <svg class="icon icon-bumen" aria-hidden="true">
            <use xlink:href="#iconbumen"></use>
        </svg>
        <svg class="icon svg-icon" aria-hidden="true">
            <use xlink:href="#iconuser"></use>
        </svg>

        <svg class="icon svg-icon" aria-hidden="true">
            <use xlink:href="#iconbumen1"></use>
        </svg>

        <svg class="icon svg-icon" aria-hidden="true">
            <use xlink:href="#icontree"></use>
        </svg>

    </div>
</div>
</template>

<script>
export default {
    name: "demoPop",
    data() {
        return {
            show: false,
            gridData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }],
            dialogTableVisible: false,
            dialogFormVisible: false,
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            formLabelWidth: '120px'
        };
    },
    methods: {
        open() {
            this.$message('这是一条消息提示');
        },

        openVn() {
            const h = this.$createElement;
            this.$message({
                message: h('p', null, [
                    h('span', null, '内容可以是 '),
                    h('i', {
                        style: 'color: teal'
                    }, 'VNode')
                ])
            });
        },
        open1() {
            this.$alert('这是一段内容', '标题名称', {
                confirmButtonText: '确定',
                callback: action => {
                    // this.$message({
                    //     type: 'info',
                    //     message: `action: ${ action }`
                    // });
                }
            });
        },
        openRightBox() {

        },
        open2() {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }
    }
}
</script>
<style lang="less" scoped>
button{
    margin: 5px;
}
</style>

