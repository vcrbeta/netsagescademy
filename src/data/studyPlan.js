export const studyPlan = {
  weeks: [
    {
      weekNumber: 1,
      title: "Networking Foundations & IP Addressing",
      description: "Master the fundamentals of networking",
      days: [
        { day: 1, title: "Intro & Networking Models", topics: ["OSI/TCP-IP"] },
        { day: 2, title: "TCP/IP Basics", topics: ["IP addressing", "Subnetting"] },
        { day: 3, title: "TCP/IP Applications", topics: ["Ports", "Protocols"] },
        { day: 4, title: "IPv4/IPv6 Addressing", topics: ["Subnetting"] },
        { day: 5, title: "Dynamic/Static IP", topics: ["DHCP"] },
        { day: 6, title: "Ethernet Basics", topics: ["Switches"] },
        { day: 7, title: "Week 1 Review", topics: ["Practice"] }
      ]
    },
    {
      weekNumber: 2,
      title: "Routing, Switching, VLANs & Wireless",
      description: "Learn routing protocols and VLANs",
      days: [
        { day: 8, title: "Routing Fundamentals", topics: ["NAT"] },
        { day: 9, title: "VLANs & Switching", topics: ["Trunking"] },
        { day: 10, title: "Wireless Networking", topics: ["802.11"] },
        { day: 11, title: "TCP/IP Applications", topics: ["FTP", "SSH"] },
        { day: 12, title: "Scenario Labs", topics: ["Practice"] },
        { day: 13, title: "IPv6 Deep Dive", topics: ["Tunneling"] },
        { day: 14, title: "Week 2 Review", topics: ["Practice"] }
      ]
    },
    {
      weekNumber: 3,
      title: "Network Security & Troubleshooting",
      description: "Security and modern networking",
      days: [
        { day: 15, title: "Securing TCP/IP", topics: ["Encryption"] },
        { day: 16, title: "Network Operations", topics: ["Monitoring"] },
        { day: 17, title: "Virtualization & Cloud", topics: ["SDN"] },
        { day: 18, title: "Troubleshooting", topics: ["Wireshark"] },
        { day: 19, title: "Practice Exam 1", topics: ["Exam"] },
        { day: 20, title: "Practice Exam 2", topics: ["Exam"] },
        { day: 21, title: "Final Review", topics: ["Review"] }
      ]
    }
  ]
};

export const getWeekByDay = (dayNumber) => {
  for (const week of studyPlan.weeks) {
    const dayInfo = week.days.find(d => d.day === dayNumber);
    if (dayInfo) {
      return { ...week, currentDay: dayInfo };
    }
  }
  return null;
};

export default studyPlan;