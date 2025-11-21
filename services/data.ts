import { GraphData } from '../types';

export const qingData: GraphData = {
  nodes: [
    {
      id: "nurhaci",
      name: "爱新觉罗·努尔哈赤",
      templeName: "清太祖",
      eraName: "天命",
      reign: "1616–1626",
      description: "清朝的奠基者，后金建立者。统一女真各部，建立八旗制度。",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Nurhaci_portrait.jpg/440px-Nurhaci_portrait.jpg",
      generation: 1
    },
    {
      id: "hongtaiji",
      name: "爱新觉罗·皇太极",
      templeName: "清太宗",
      eraName: "天聪/崇德",
      reign: "1626–1643",
      description: "改国号为“大清”，建立完善的官僚体系，迫使朝鲜臣服。",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Hiong_Tai_Gi.jpg/440px-Hiong_Tai_Gi.jpg",
      generation: 2
    },
    {
      id: "shunzhi",
      name: "爱新觉罗·福临",
      templeName: "清世祖",
      eraName: "顺治",
      reign: "1643–1661",
      description: "清朝入关后的第一位皇帝，六岁即位，由多尔衮摄政。",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Shunzhi_Emperor.jpg/440px-Shunzhi_Emperor.jpg",
      generation: 3
    },
    {
      id: "kangxi",
      name: "爱新觉罗·玄烨",
      templeName: "清圣祖",
      eraName: "康熙",
      reign: "1661–1722",
      description: "中国历史上在位时间最长的皇帝。平定三藩，收复台湾，驱逐沙俄。",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Kangxi_Emperor_Portrait.jpg/440px-Kangxi_Emperor_Portrait.jpg",
      generation: 4
    },
    {
      id: "yongzheng",
      name: "爱新觉罗·胤禛",
      templeName: "清世宗",
      eraName: "雍正",
      reign: "1722–1735",
      description: "勤于政务，设立军机处，推行摊丁入亩，打击贪腐。",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Yongzheng_Emperor_Portrait.jpg/440px-Yongzheng_Emperor_Portrait.jpg",
      generation: 5
    },
    {
      id: "qianlong",
      name: "爱新觉罗·弘历",
      templeName: "清高宗",
      eraName: "乾隆",
      reign: "1735–1796",
      description: "自号“十全老人”，文治武功鼎盛，但晚年宠信和珅，国力转衰。",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Qianlong_Emperor_Portrait.jpg/440px-Qianlong_Emperor_Portrait.jpg",
      generation: 6
    },
    {
      id: "jiaqing",
      name: "爱新觉罗·颙琰",
      templeName: "清仁宗",
      eraName: "嘉庆",
      reign: "1796–1820",
      description: "惩治和珅，试图整顿吏治，但未能扭转清朝颓势。",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Jiaqing_Emperor_Portrait.jpg/440px-Jiaqing_Emperor_Portrait.jpg",
      generation: 7
    },
    {
      id: "daoguang",
      name: "爱新觉罗·旻宁",
      templeName: "清宣宗",
      eraName: "道光",
      reign: "1820–1850",
      description: "在位期间爆发第一次鸦片战争，签订《南京条约》，中国开始沦为半殖民地。",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Daoguang_Emperor_Portrait.jpg/440px-Daoguang_Emperor_Portrait.jpg",
      generation: 8
    },
    {
      id: "xianfeng",
      name: "爱新觉罗·奕詝",
      templeName: "清文宗",
      eraName: "咸丰",
      reign: "1850–1861",
      description: "面临太平天国运动和第二次鸦片战争，逃往热河避暑山庄后病逝。",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Xianfeng_Emperor_Portrait.jpg/440px-Xianfeng_Emperor_Portrait.jpg",
      generation: 9
    },
    {
      id: "tongzhi",
      name: "爱新觉罗·载淳",
      templeName: "清穆宗",
      eraName: "同治",
      reign: "1861–1875",
      description: "慈禧太后垂帘听政，出现“同治中兴”局面，英年早逝。",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Tongzhi_Emperor_Portrait.jpg/440px-Tongzhi_Emperor_Portrait.jpg",
      generation: 10
    },
    {
      id: "guangxu",
      name: "爱新觉罗·载湉",
      templeName: "清德宗",
      eraName: "光绪",
      reign: "1875–1908",
      description: "醇亲王奕譞之子，试图通过戊戌变法挽救危局，后被慈禧囚禁。",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Guangxu_Emperor_Portrait.jpg/440px-Guangxu_Emperor_Portrait.jpg",
      generation: 10
    },
    {
      id: "xuantong",
      name: "爱新觉罗·溥仪",
      templeName: "无",
      eraName: "宣统",
      reign: "1908–1912",
      description: "中国最后一位皇帝，醇亲王载沣长子。1912年退位，清朝灭亡。",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Puyi_Young.jpg/440px-Puyi_Young.jpg",
      generation: 11
    }
  ],
  links: [
    { source: "nurhaci", target: "hongtaiji", label: "父子" },
    { source: "hongtaiji", target: "shunzhi", label: "父子" },
    { source: "shunzhi", target: "kangxi", label: "父子" },
    { source: "kangxi", target: "yongzheng", label: "父子" },
    { source: "yongzheng", target: "qianlong", label: "父子" },
    { source: "qianlong", target: "jiaqing", label: "父子" },
    { source: "jiaqing", target: "daoguang", label: "父子" },
    { source: "daoguang", target: "xianfeng", label: "父子" },
    { source: "xianfeng", target: "tongzhi", label: "父子" },
    { source: "daoguang", target: "guangxu", label: "祖孙(过继)" }, // Actually nephew of Xianfeng, but simplistic linkage for visual flow
    { source: "xianfeng", target: "guangxu", label: "堂兄弟/继嗣" }, // This relationship is complex in force graph, simplifying to lineage
    { source: "guangxu", target: "xuantong", label: "继嗣" },
  ]
};
