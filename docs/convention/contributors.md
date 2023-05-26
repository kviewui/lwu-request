---
page: true
title: 贡献者
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
  VPTeamPageSection
} from 'vitepress/theme'

const members = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/41771224?v=4',
    name: 'littlezo',
    title: '贡献者',
    links: [
      { icon: 'github', link: 'https://github.com/littlezo' },
      // { icon: 'email', link: 'https://twitter.com/youyuxi' }
    ]
  },
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      贡献者名单
    </template>
    <template #lead>
      项目一直秉持着开源的精神给开发者提供更加优质的服务，所以会认真总结采纳各位开发者们的意见建议，有了各位开发者的参与，项目才会在开源社区中走得更远。<a href="./contributing.html">贡献指南</a>
    </template>
  </VPTeamPageTitle>
  <VPTeamPageSection>
    <template #title>以下名单不分前后顺序。感谢你们的努力与参与！</template>
    <template #lead>给该项目提供建议或者提供合理有效PR的都会在贡献者名单中。</template>
    <template #members>
      <VPTeamMembers
        :members="members"
      />
    </template>
  </VPTeamPageSection>
</VPTeamPage>