<template>
    <el-dropdown class="lang-dropdown__text">
        <span class="el-dropdown-link">
            {{ $t('APP.NAV.LANG.TITLE') }}
            <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="$emit('changeLanguage', 'fr')">
                    {{ $t('APP.NAV.LANG.FR') }}
                </el-dropdown-item>
                <el-dropdown-item @click="$emit('changeLanguage', 'en')">
                    {{ $t('APP.NAV.LANG.EN') }}
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>
<script lang="ts">
export default {
    emits: ['changeLanguage'],
}
</script>
