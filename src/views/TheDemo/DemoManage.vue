<template>
<div>
    <DemoHeader/>
    
    <router-view></router-view>

</div>
</template>

<script>
import DemoHeader from './DemoHeader'
export default {
    components: {
        DemoHeader,
    }

}
</script>

<style>
.main {
    width: 630px;
    margin: 0 auto;
    padding: 50px;
    text-align: left;
     border: 1px solid #EBEEF5; 
}
</style>

