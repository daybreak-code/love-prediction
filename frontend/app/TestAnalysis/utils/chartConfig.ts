import type { EChartsOption } from 'echarts';

export const getChartOptions = (type: string): EChartsOption => {
  const baseOptions = {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      borderRadius: 4,
      padding: [8, 12],
      textStyle: {
        color: '#FFFFFF',
        fontSize: 14
      }
    },
    animation: true,
    animationDuration: 1000,
    animationEasing: 'cubicInOut'
  };

  switch (type) {
    case 'pie':
      return {
        ...baseOptions,
        series: [{
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: true,
          itemStyle: {
            borderRadius: 6,
            borderColor: '#FFFFFF',
            borderWidth: 2
          },
          label: {
            show: true,
            formatter: '{b}: {d}%'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              fontWeight: 'bold'
            }
          },
          data: [
            { value: 35, name: '情感表达' },
            { value: 25, name: '同理心' },
            { value: 20, name: '沟通能力' },
            { value: 15, name: '价值观' },
            { value: 5, name: '其他' }
          ]
        }]
      };

    case 'bar':
      return {
        ...baseOptions,
        xAxis: {
          type: 'category',
          data: ['情感表达', '同理心', '沟通能力', '价值观', '整体表现'],
          axisLabel: {
            interval: 0,
            rotate: 30
          }
        },
        yAxis: {
          type: 'value',
          max: 100
        },
        series: [
          {
            name: '个人得分',
            type: 'bar',
            data: [85, 65, 75, 90, 80],
            itemStyle: {
              color: '#FF6B6B'
            }
          },
          {
            name: '平均水平',
            type: 'bar',
            data: [70, 70, 70, 70, 70],
            itemStyle: {
              color: '#4ECDC4'
            }
          }
        ]
      };

    case 'line':
      return {
        ...baseOptions,
        xAxis: {
          type: 'category',
          data: ['第一周', '第二周', '第三周', '第四周']
        },
        yAxis: {
          type: 'value',
          max: 100
        },
        series: [
          {
            name: '能力提升',
            type: 'line',
            smooth: true,
            data: [65, 70, 75, 85],
            lineStyle: {
              color: '#FF6B6B'
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: 'rgba(255, 107, 107, 0.4)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 107, 107, 0.1)'
                }]
              }
            }
          }
        ]
      };

    default:
      return baseOptions;
  }
};

export const getRadarChartConfig = (): EChartsOption => {
  return {
    radar: {
      indicator: [
        { name: '情感表达', max: 100 },
        { name: '同理心', max: 100 },
        { name: '沟通能力', max: 100 },
        { name: '价值观', max: 100 },
        { name: '亲密度', max: 100 }
      ]
    },
    series: [{
      type: 'radar',
      data: [
        {
          value: [85, 70, 75, 80, 70],
          name: '个人数据',
          itemStyle: { color: '#FF6B6B' },
          areaStyle: { color: 'rgba(255, 107, 107, 0.2)' }
        },
        {
          value: [70, 70, 70, 70, 70],
          name: '平均水平',
          itemStyle: { color: '#4ECDC4' },
          areaStyle: { color: 'rgba(78, 205, 196, 0.2)' }
        }
      ]
    }]
  };
}; 