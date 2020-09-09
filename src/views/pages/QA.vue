<template>
  <div class="questions_answers qa_page">
    <div class="list">
      <div class="qa_item">
        <div class="questions">
          <div class="qa_item_left"><span>问</span></div>
          <div class="qa_item_right">员工专业能力评价体系的定位是什么？</div>
        </div>
        <div class="answers">
          <div class="qa_item_left"><span>答</span></div>
          <div class="qa_item_right">
            本评价体系确定涵盖广义的专业能力，引导员工提升能够为南中持续创造价值的专业能力（素养）,
            包括集团理念践行、个人职业精神、银行从业者通用能力、岗位专业能力、价值创造能力等。有别于员工绩效考核体系，
            员工专业能力评价体系聚焦员工的中长期发展，
            偏重评价员工的本职工作关键任务行为完成情况、价值创造的过程类和结构类指标、
            个人专业资质和各类培训及线上学习的完成情况、专业技能的传授分享带教情况等。
          </div>
        </div>
      </div>
      <div class="qa_item">
        <div class="questions">
          <div class="qa_item_left"><span>问</span></div>
          <div class="qa_item_right">员工专业能力评价与绩效考核的区别？</div>
        </div>
        <div class="answers">
          <div class="qa_item_left"><span>答</span></div>
          <div class="qa_item_right">
            员工专业能力评价与现有绩效考核互相独立，又互为补充。
            专业能力评价体系能是用统一的工具，实现对员工在思想、素养、能力、结果4个层面的完整评估，
            为员工职业发展、能力建设提供扎实全面的依据。
            而绩效考核主要聚焦于实现可量化、可评估、可达成的短期目标，主要以结果层面作为评估依据。
          </div>
        </div>
      </div>
      <div class="qa_item">
        <div class="questions">
          <div class="qa_item_left"><span>问</span></div>
          <div class="qa_item_right">员工专业能力评价结果如何应用？</div>
        </div>
        <div class="answers">
          <div class="qa_item_left"><span>答</span></div>
          <div class="qa_item_right">
            员工专业能力评价结果主要应用于选人才、定管理职务晋升、定学习地图和培训计划、评选总分行年度专业能力优秀员工等。
          </div>
        </div>
      </div>
      <div class="qa_item">
        <div class="questions">
          <div class="qa_item_left"><span>问</span></div>
          <div class="qa_item_right">员工专业能力评价体系的指标设计思路？</div>
        </div>
        <div class="answers">
          <div class="qa_item_left"><span>答</span></div>
          <div class="qa_item_right">
            在总结过往经验的基础上，确立了“能力显化、指标量化、维度简化”的评价思路。通过“以实绩衡量能力”，
            使得对员工专业能力的评价有了客观依据，并有助于增强评价结果的公信力；通过“积分制”，
            实现多维度评价结果的归一化、能力衡量的数据化，简单、清晰、便于管理；通过“聚焦核心维度”，
            兼顾评价指标的代表性与具体实施的便利性。按照上述思路，构建了员工专业能力评价模型，每项指标设有相应的权重和评分细则。
            专业能力评价工作计划每年开展一次，与员工年度绩效考核同步实施。
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script></script>

<style scoped>
.qa_page{
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.list{
  height: 100%;
}
.qa_item{
  padding: 0.32rem 0.48rem;
  border-bottom: solid 0.01rem #DDD;
}
.qa_item_left{
  width: 0.5rem;
}
.qa_item_right{
  padding-left: 0.14rem;
  text-align: left;
  line-height: 0.56rem;
}
.questions .qa_item_right{
  font-size: 0.3rem;
  line-height: 0.36rem;
}
.questions{
  display: flex;
  font-weight: bold;
  padding: 0.15rem 0;
  line-height: 0.36rem;
}
.questions span {
  font-size: 0.24rem;
  background-color: #Fa3;
  color: white;
  font-weight: normal;
  padding: 0.02rem 0.055rem;
  border-radius: 0.04rem;
}
.answers{
  display: flex;
  /*font-weight: bold;*/
  padding: 0.15rem 0;
  line-height: 0.5rem;
}
.answers span {
  font-size: 0.24rem;
  background-color: #44d61f;
  color: white;
  font-weight: normal;
  padding: 0.02rem 0.05rem;
  border-radius: 0.04rem;
}
.as{}
</style>
