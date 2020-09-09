import { apiRequest, qryScore, qryOrder } from '@/libs/api';
import Principle from '@/libs/_util/principle';

export default {
  data() {
    return {
      userInfo: this.$store.state.isManager
        ? this.$store.state.employeeInfo : this.$store.state.userInfo,
      items: [
        { name: 0, label: '专业精神' },
        { name: 1, label: '专业价值' },
        { name: 2, label: '专业技能' }
      ],
      bcs: ['#fdefe3', '#eef6e4', '#E3F1F9'],
      colors: ['#f29a4f', '#8bc34a', '#45C9D8'],
      bc: '#E3F1F9',
      color: '#45C9D8',
      index: 0,
      resources: {},
      orderData: {},
      principle: {}
    };
  },
  created() {
    this.queryPerformance();
    this.principle = Principle;
  },
  methods: {
    queryPerformance() {
      apiRequest(this, qryScore({
        positionId: this.userInfo.positionId,
        empNo: this.userInfo.empNo
      }), (res) => {
        this.resources = res.obj;
      });
      apiRequest(this, qryOrder({
        positionId: this.userInfo.positionId,
        empNo: this.userInfo.empNo
      }), (res) => {
        this.orderData = res.obj;
      });
    },
    onTabChange(item, index) {
      this.$refs.swiper.goto(index);
    },
    onSwiperChange(from, to) {
      this.index = to;
    }
  }
};
