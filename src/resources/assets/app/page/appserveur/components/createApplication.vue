<template>
    <a-form :layout="'vertical'">
        <a-form-item>
            <a-radio-group
                style="width: 100%;"
                default-value="infusionsoft" 
                @change="handleFormApplicationChange">
                <a-radio-button style="width: 50%;" value="trello">
                    Trello
                </a-radio-button>
                <a-radio-button style="width: 50%;" value="infusionsoft">
                    Infusionsoft
                </a-radio-button>
            </a-radio-group>
        </a-form-item>    
        <a-form-item v-if="type=='infusionsoft'" :label="$lang('appInfusionsoftName')">
            <a-input
                v-decorator="[
                    'name',
                    {rules: [{ required: true, message: 'Please input name!' }]} ]"
                v-model="name" :placeholder="$lang('appInfusionsoftName')" /> 
        </a-form-item>
        <a-form-item v-if="type=='infusionsoft'" :label="$lang('appInfusionsoftUrlId')">
            <a-input
                v-decorator="[
                    'compteId',
                    {rules: [{ required: true, message: 'Please input website!' }]}]"
                    v-model="compteId" :placeholder="$lang('appInfusionsoftUrlId')" />      
        </a-form-item>
        <a-form-item v-if="type=='trello'" :label="$lang('appTrelloName')">
            <a-input
                v-decorator="[
                    'name',
                    {rules: [{ required: true, message: 'Please input name!' }]}]"
                v-model="name" :placeholder="$lang('appTrelloName')" />   
        </a-form-item>
    </a-form>
</template>
<script>
	
    import application from '../store/application' ; 
	
	export default {

		props : [], 

		data(){
            return {
                name : '' , 
                compteId : '' , 
                type : 'infusionsoft' , 
                application  : application.stade

            }
        },
        methods : {
            handleFormApplicationChange  (e) {
                this.type = e.target.value;
            },
        },
		created(){
			this.on('ApplicationCreate',async () => {
                await application.addApplication( { name :this.name , compteId : this.compteId, type : this.type } )
                this.emit('closemodale') ; 
			});
		}
	}
</script>