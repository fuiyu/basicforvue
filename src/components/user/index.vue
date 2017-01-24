<template>
    <form class="bs-example bs-example-form" role="form">
        <div class="input-group">
            <span class="input-group-addon">选择文件</span>
            <input @change="ok" type="file" name="data" id="fileName" class="form-control" placeholder="Username">
        </div>
        
    </form>
</template>
<script>
    // import {login} from '../../api/resources'
    export default {
        data() {
            return {
                file: {
                    data: ''
                }
            }
        },
        methods: {
            ok() {
                 var fd = new FormData();
    	  //关联表单数据,可以是自定义参数
    	        fd.append("data", document.getElementById('fileName').files[0]);      
                this.$http.post('/user/uploadAvatar',fd).then((response) => {
                    //      if(response.ok){
                    //     location = '/'
                    // }
                    console.log(response)
                }
                )

            }
        }
    }
</script>