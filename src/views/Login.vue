<template>
    <div class="container" id="app">
        <div class="contentBox">
            <p class="topClass">聚通达运营管理平台</p>
            <div class="content">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                    <el-form-item prop="username" style="font-size: 16px;">
                        <el-input v-model="ruleForm.username"><template slot="prepend"><svg t="1565605181342" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1048" width="64" height="64"><path d="M893.611502 1024H130.388498a92.337854 92.337854 0 0 1-92.233439-92.233439 491.569423 491.569423 0 0 1 153.142314-356.456136l127.804221-121.347881a5.690629 5.690629 0 0 0 1.740254-4.072194 3.480507 3.480507 0 0 0-0.991945-2.67999A258.671289 258.671289 0 0 1 241.764726 261.403487C241.764726 117.258285 359.510282 0 504.351586 0c2.61038 0 4.87271 0.156623 6.665171 0.278441h1.949084c1.740254-0.121818 4.037388-0.278441 6.647768-0.278441 144.841304 0 262.778288 117.258285 262.778288 261.403487A258.671289 258.671289 0 0 1 704.167499 447.245165a3.480507 3.480507 0 0 0-1.009347 2.679991 5.725434 5.725434 0 0 0 1.740254 4.072193l127.804221 121.347881a491.569423 491.569423 0 0 1 153.142314 356.456136 92.337854 92.337854 0 0 1-92.233439 92.198634zM504.351586 64.876653c-109.061691 0-197.79722 88.161245-197.79722 196.526834A194.212297 194.212297 0 0 0 365.322729 400.919615a67.974304 67.974304 0 0 1 20.413174 49.527617 70.96754 70.96754 0 0 1-21.979403 50.571768l-127.804221 121.347881a428.502634 428.502634 0 0 0-132.920567 309.39968A27.374189 27.374189 0 0 0 130.388498 959.123347h763.223004a27.374189 27.374189 0 0 0 27.339383-27.356786 428.502634 428.502634 0 0 0-132.868359-309.39968l-127.804221-121.347881a70.96754 70.96754 0 0 1-21.979403-50.571768 67.974304 67.974304 0 0 1 20.413174-49.527617 194.177492 194.177492 0 0 0 58.716156-139.516128c0-108.365589-88.752932-196.526835-197.814623-196.526834-0.382856 0-1.392203 0-2.192719 0.121817-1.461813 0.104415-2.906223 0.191428-4.368037 0.243636h-2.123109c-1.461813 0-2.906223-0.13922-4.368036-0.243636-0.800517-0.052208-1.827266-0.121818-2.210122-0.121817z" fill="#886FF7" p-id="1049"></path><path d="M472.487543 653.900275m39.486353 0l0.017403 0q39.486353 0 39.486353 39.486354l0 92.946942q0 39.486353-39.486353 39.486354l-0.017403 0q-39.486353 0-39.486353-39.486354l0-92.946942q0-39.486353 39.486353-39.486354Z" fill="#FFCE00" p-id="1050"></path></svg></template></el-input>
                    </el-form-item>
                    <el-form-item prop="password" style="margin-bottom: 10px;font-size: 16px;">
                        <el-input type="password" v-model="ruleForm.password"><template slot="prepend"><svg t="1565605145683" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8094" width="64" height="64"><path d="M511.939582 1024l-13.025575-7.608316A875.301412 875.301412 0 0 1 65.101964 285.976076a53.482495 53.482495 0 0 1 32.779593-51.239681A1700.277521 1700.277521 0 0 0 479.004717 11.334838a53.741281 53.741281 0 0 1 66.025002 0 1699.501163 1699.501163 0 0 0 381.05415 223.401557 53.482495 53.482495 0 0 1 32.779593 51.239681 877.406207 877.406207 0 0 1-122.181622 421.079758 877.388954 877.388954 0 0 1-311.630421 309.33585z m-1.242174-971.811436A1751.534454 1751.534454 0 0 1 118.101391 282.404825a2.053038 2.053038 0 0 0-1.242174 2.053038c8.212151 281.024632 155.599555 533.893318 395.080365 679.469219 239.567072-145.575901 386.954477-398.530849 395.080365-679.469219a2.087543 2.087543 0 0 0-1.242174-2.053038A1751.120396 1751.120396 0 0 1 513.268018 52.188564a2.00128 2.00128 0 0 0-2.5016 0z" fill="#886FF7" p-id="8095"></path><path d="M721.00438 374.929541a11.214072 11.214072 0 0 0-15.83772 0L458.888398 621.207804l-66.232032-66.232032a11.196819 11.196819 0 1 0-15.820467 15.83772l73.874853 73.874853a3.605755 3.605755 0 0 0 0.241533 0.293291 11.162314 11.162314 0 0 0 15.820468 0l254.231627-254.231628a11.196819 11.196819 0 0 0 0-15.820467z" fill="#FFCE00" p-id="8096"></path><path d="M458.853893 665.512013a28.25946 28.25946 0 0 1-20.116319-8.332918c-0.293291-0.293291-0.586582-0.603835-0.828116-0.879873l-73.271018-73.288271a28.449237 28.449237 0 1 1 40.215385-40.232638l54.034573 54.034572 234.080803-234.080803a28.483742 28.483742 0 0 1 40.232638 0 28.466489 28.466489 0 0 1 0 40.215386L478.970212 657.179095a28.190451 28.190451 0 0 1-20.116319 8.332918z" fill="#FFCE00" p-id="8097"></path></svg></template></el-input>
                    </el-form-item>
                    <el-form-item style="text-align: left;margin-bottom: 10px;">
                        <el-checkbox-group v-model="ruleForm.type">
                            <el-link :underline="false" @click="findPassword" class="findPassword">修改密码</el-link>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-button class="btn" type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </el-form>
            </div>
        </div>
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
            <el-form :model="rulePasswordForm" :rules="rulePassword" ref="rulePasswordForm" >
                <el-form-item label="手机号" prop="mobile" :label-width="formLabelWidth">
                    <el-input v-model="rulePasswordForm.mobile" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="旧密码" prop="mobile" :label-width="formLabelWidth">
                    <el-input v-model="rulePasswordForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword" :label-width="formLabelWidth">
                    <el-input v-model="rulePasswordForm.newPassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="reNewPassword" :label-width="formLabelWidth">
                    <el-input v-model="rulePasswordForm.reNewPassword" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" id="footerContent">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitFindForm('rulePasswordForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>
<script>
    import { login } from "@/utils/Api"
    export default {
        data() {
            //验证密码长度
            var validatePass = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请输入密码'));
                }  else if (value.length < 6) {
                    callback(new Error('长度最少6个字符'));
                } else {
                    callback();
                }
            };
            //验证确认密码
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入确认密码'));
                } else if (value !== this.rulePasswordForm.newPassword) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            //手机号验证
            var checkPhone = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('手机号不能为空'));
                } else {
                    const reg = /^1[3|4|5|7|8|9][0-9]\d{8}$/
                    console.log(reg.test(value));
                    if (reg.test(value)) {
                        return true;
                    } else {
                        return callback(new Error('请输入正确的手机号'));
                    }
                }
            };
            return {
                ruleForm: {
                    username: '',
                    password: '',
                    type: true,
                },
                rulePasswordForm: {
                    mobile: '',
                    password: '',
                    newPassword: '',
                    reNewPassword: '',
                },
                rules: {
                    username: [
                        {required: true, message: '请输入账户', trigger: 'blur'},
                        {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
                    ]
                },
                rulePassword: {
                    mobile: [
                        {  required: true, validator: checkPhone, trigger: 'blur' }
                    ],
                    password: [
                        {required: true, message: '请输入账户', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    newPassword: [
                        {  required: true, validator: validatePass, trigger: 'blur' }
                    ],
                    reNewPassword: [
                        {  required: true, validator: validatePass2, trigger: 'blur' }
                    ]
                },
                form:{
                    mobile: '',
                    newPassword: '',
                    password: '',
                    reNewPassword: ''
                },
                dialogFormVisible:false,
                formLabelWidth: '80px'
            };
        },
        methods: {
            //登陆
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$Api.Login.loginIn({
                            mobile:this.ruleForm.username,
                            password:this.ruleForm.password,
                        }).then(res => {
                            if (res.result == '00000000') {
                                this.$message({
                                    message: '登录成功',
                                    type: 'success'
                                });
                                //1个小时过期的token
                                this.$cookie.set("loginToken", res.data, {
                                    expires: 1
                                });
                                this.$router.push('/home');
                            } else {
                                this.$message({
                                    message: res.msg,
                                    type: 'error'
                                });
                            }
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //找回密码
            submitFindForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$Api.Login.fingPassword({
                            mobile:this.rulePasswordForm.username,
                            oldPass:this.rulePasswordForm.password,
                            newPass1:this.rulePasswordForm.newPassword,
                            newPass2:this.rulePasswordForm.reNewPassword,
                        }).then(res => {
                            if (res.result == '00000000') {
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                                this.dialogFormVisible=false;
                            } else {
                                this.$message({
                                    message: res.msg,
                                    type: 'error'
                                });
                            }
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //重置用户名,密码
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            //找回密码
            findPassword(){
                this.dialogFormVisible=true;
            },
        },
        mounted() {

        }
    };
</script>
<style lang="less" scoped>
    html,body{
        height: 100%;
        width: 100%;
        margin:0;
        padding:0;
        overflow:hidden;
    }
    .container {
        height: 100vh;
        width: 100%;
        overflow: hidden;
        background: url("../assets/images/loginBG.png");
        background-size: cover;
        position: relative;
    }
    #footerContent{
        text-align: center;
    }
    .container .topClass {
        width: 450px;
        margin: 0 auto;
        margin-top: 30px;
        margin-bottom: 20px;
        letter-spacing: 2px;
        font-family:"webfont" !important;
        font-size:26px;font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
        .logoImg{
            width: 300px;
            height: auto;
            margin: 0 auto;
        }
    }

    .container .topClass img {
        display: inline-block;
        width: 800px;
        height: auto;
        margin: 0 auto;
    }

    .contentBox {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -220px;
        margin-top: -220px;
        border-radius: 4px;
        -moz-border-radius: 4px;
        -webkit-border-radius: 4px;
        background-color: #fff;
        width: 440px;
        height: 400px;
        box-shadow: 0 2px 10px #999;
        -moz-box-shadow: #999 0 2px 10px;
        -webkit-box-shadow: #999 0 2px 10px;
    }

    .demo-ruleForm {
        width: 350px;
        margin: 0 auto;
        text-align: center;
        margin-top: 50px;
        .findPassword{
            float: right;
            color: #66b1ff;
        }
    }

    .contentBox .el-form-item__content {
        height: 60px;
        line-height: 60px;
    }

    .contentBox .btn {
        width: 200px;
        height: 40px;
        font-size: 16px;
        letter-spacing: 2px;
        color: #fff;
        background-color: #409eff;
        border-color: #409eff;
        margin-top: 10px;
    }
    .contentBox .btn:hover {
        background: #66b1ff;
        border-color: #66b1ff;
        color: #fff;
    }
    .el-form-item__content{
        .el-form-item__error{
            color: #F56C6C;
            font-size: 12px;
            line-height: 1;
            padding-top: 4px;
            position: absolute;
            top: 100%;
            left: 50%;
        }
    }

</style>
<style>
    .container .el-form-item__error{
        color: #F56C6C;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -30px;
    }
    .container .el-dialog{
        width: 500px !important;
    }


</style>
