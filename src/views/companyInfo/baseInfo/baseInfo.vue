<style lang="less" scoped>
@import "./baseInfo.less";
</style>
<template>
    <div class="baseInfo-warp">
        <div class="baseInfo-body">
            <div class="baseInfo-body-content">
                <div class="content">
                    <label class="content-left">公司名称</label>
                    <Input type="text" v-model="companyName" class="content-right"></Input>
                </div>
                <div class="content">
                    <label class="content-left">公司简称</label>
                    <Input type="text" v-model="companyAbbreviation" class="content-right"></Input>
                </div>
                <div class="content">
                    <label class="content-left">公司类型</label>
                    <RadioGroup v-model="companyType" class="content-right">
                        <Radio label='有限责任公司'></Radio>
                        <Radio label='股份有限公司'></Radio>
                        <Radio label='集团公司'></Radio>
                        <Radio label='有限合伙'></Radio>
                        <Radio label='普通合伙'></Radio>
                        <Radio label='个人独资'></Radio>
                        <Radio label='子公司'></Radio>
                    </RadioGroup>
                </div>
                <div class="content">
                    <label class="content-left">公司状态</label>
                    <Select v-model="model1" class="content-right">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
                <div class="contentDes">
                    <label class="content-left">公司说明</label>
                    <Input v-model="companyDescription" type="textarea" :rows="3" class="content-right"></Input>
                </div>
            </div>
        </div>
        <div class="buttons">
            <Button type="success">保存</Button>
            <Button type="success">修改</Button>
            <Button type="success">删除</Button>
        </div>
    </div>
</template>

<script>
export default {};
</script>
