// DAY 7: Week 1 Comprehensive Review - COMPLETE MODULE

export const day7Module = {
  day: 7,
  module_title: "Week 1 Review & Practice Scenarios",
  
  // CONVERSATIONAL CONTENT (Full Mode)
  lesson_content: `**Welcome to Day 7: Week 1 Review!**

Congratulations on making it through Week 1! 🎉 Today we're pulling everything together. We'll review key concepts, practice with real-world scenarios, and make sure you're ready for Week 2. Let's do this!

**📚 Week 1 Recap: What We've Covered**

**Day 1: Networking Models**
✅ OSI 7-layer model
✅ TCP/IP 4-layer model
✅ Encapsulation (Data → Segment → Packet → Frame → Bits)
✅ Each layer's function and protocols
✅ Troubleshooting layer by layer

**Day 2: TCP/IP Protocols & Ports**
✅ Application layer protocols (FTP, SSH, HTTP, DNS, DHCP, etc.)
✅ TCP vs UDP (connection-oriented vs connectionless)
✅ Three-way handshake (SYN, SYN-ACK, ACK)
✅ Port numbers (80, 443, 22, 25, 53, etc.)
✅ DORA process for DHCP

**Day 3: TCP/IP Applications**
✅ Email systems (SMTP, POP3, IMAP)
✅ Web communication (HTTP/HTTPS, status codes)
✅ File transfer (FTP, SFTP, TFTP)
✅ Remote access (SSH, RDP, Telnet)
✅ DNS record types and resolution
✅ Protocol analysis and troubleshooting

**Day 4: IP Addressing & Subnetting**
✅ IPv4 structure (32 bits, 4 octets)
✅ IP address classes (A, B, C, D, E)
✅ Subnet masks and CIDR notation
✅ Subnetting calculations
✅ Private addresses (RFC 1918)
✅ IPv6 basics (128 bits, hexadecimal)

**Day 5: Dynamic vs Static IP**
✅ Static IP configuration
✅ DHCP DORA process
✅ DHCP scope components
✅ Lease lifecycle
✅ APIPA (169.254.x.x)
✅ DHCP troubleshooting

**Day 6: Ethernet & Switching**
✅ Ethernet standards (100BASE-TX, 1000BASE-T, 10GBASE-T)
✅ MAC addresses (48-bit hardware addresses)
✅ Ethernet frame structure
✅ Switch operation (learn, forward, flood, filter)
✅ Collision vs broadcast domains
✅ Full-duplex vs half-duplex
✅ Cable categories (Cat5e, Cat6, Cat6a)

**🎯 Critical Concepts You MUST Know**

**OSI Model (Please Do Not Throw Sausage Pizza Away):**

  7. Application  - HTTP, FTP, SMTP, DNS
  6. Presentation - Encryption, compression
  5. Session      - Establish/maintain connections
  4. Transport    - TCP/UDP, ports, segments
  3. Network      - IP addressing, routing, routers
  2. Data Link    - MAC addresses, switches, frames
  1. Physical     - Cables, signals, bits

**Must-Know Port Numbers:**

  20/21  - FTP          443   - HTTPS ⭐
  22     - SSH/SFTP     445   - SMB
  23     - Telnet       514   - Syslog
  25     - SMTP         587   - SMTPS
  53     - DNS          636   - LDAPS
  67/68  - DHCP         993   - IMAPS
  69     - TFTP         995   - POP3S
  80     - HTTP         1433  - SQL Server
  110    - POP3         3306  - MySQL
  123    - NTP          3389  - RDP
  143    - IMAP         5060/5061 - SIP
  161/162- SNMP
  389    - LDAP

**TCP vs UDP Quick Reference:**

  TCP (Reliable):              UDP (Fast):
  • Connection-oriented        • Connectionless
  • Guaranteed delivery        • No guarantee
  • Ordered packets           • Unordered
  • Error checking            • Minimal overhead
  • Slower                    • Faster
  • Web, Email, FTP           • Streaming, VoIP, DNS

**Common Subnet Masks:**

  /24 = 255.255.255.0   → 254 hosts
  /25 = 255.255.255.128 → 126 hosts
  /26 = 255.255.255.192 → 62 hosts
  /27 = 255.255.255.224 → 30 hosts
  /28 = 255.255.255.240 → 14 hosts
  /29 = 255.255.255.248 → 6 hosts
  /30 = 255.255.255.252 → 2 hosts (point-to-point)

**Private Address Ranges:**

  10.0.0.0/8         → 16,777,214 hosts
  172.16.0.0/12      → 1,048,574 hosts
  192.168.0.0/16     → 65,534 hosts

**Special Addresses:**

  127.0.0.1          → Loopback
  169.254.x.x        → APIPA (DHCP failed)
  255.255.255.255    → Limited broadcast
  FF:FF:FF:FF:FF:FF  → Broadcast MAC

**🎬 Real-World Scenarios - Let's Practice!**

**Scenario 1: New Office Setup**

**Situation:**
You're setting up a new office with 50 employees. You have:
- Network: 192.168.10.0/24
- 1 router (192.168.10.1)
- 2 switches (24-port each)
- Need: Internet, file server, 2 printers

**Your Tasks:**
1. Design IP addressing scheme
2. Configure DHCP scope
3. Assign static IPs
4. Document network

**Solution:**

**IP Addressing Plan:**

  Gateway:    192.168.10.1
  DHCP Range: 192.168.10.100-192.168.10.200 (101 IPs)
  Static IPs:
    File Server:  192.168.10.10
    Printer 1:    192.168.10.20
    Printer 2:    192.168.10.21
    Switch 1:     192.168.10.2
    Switch 2:     192.168.10.3

**DHCP Configuration:**

  Scope: 192.168.10.0/24
  Range: 192.168.10.100-192.168.10.200
  Mask: 255.255.255.0
  Gateway: 192.168.10.1
  DNS: 8.8.8.8, 8.8.4.4
  Lease: 8 hours
  Exclusions: 192.168.10.1-192.168.10.99
  Reservations:
    00:11:22:33:44:55 → 192.168.10.50 (Manager laptop)

**Scenario 2: Connectivity Troubleshooting**

**Situation:**
User reports: "I can't access the company website!"

**Step-by-Step Diagnosis:**

**Step 1: Check Physical Layer**

  Question: Is network cable plugged in?
  Check: Link light on NIC/switch
  Action: If no light, check cable

**Step 2: Check IP Configuration**

  Command: ipconfig /all (Windows) or ip addr (Linux)
  Check: 
    - Valid IP? (not 169.254.x.x)
    - Correct subnet?
    - Gateway configured?
    - DNS servers listed?

  If APIPA (169.254.x.x):
    Problem: DHCP failure
    Action: Check DHCP server, try ipconfig /renew

**Step 3: Test Local Network**

  Command: ping [gateway IP]
  Success: Local network OK
  Failure: Local network problem (cable, switch, gateway down)

**Step 4: Test Internet**

  Command: ping 8.8.8.8
  Success: Internet connectivity OK
  Failure: Router/ISP problem

**Step 5: Test DNS**

  Command: nslookup company.com
  Success: DNS working
  Failure: DNS server problem
    Action: Try different DNS (8.8.8.8)

**Step 6: Test Website**

  Command: Try accessing website
  Success: Problem was temporary
  Failure: Website down or firewall blocking

**Scenario 3: Slow Network Performance**

**Situation:**
Network is slow, users complaining about lag.

**Investigation Process:**

**Check 1: Duplex Mismatch**

  Switch shows: Half-duplex on several ports
  Problem: Performance degradation, collisions
  Solution: Set all ports to full-duplex

**Check 2: Broadcast Storm**

  Switch shows: High broadcast traffic
  Problem: Loop in network
  Solution: Check STP, find and remove loop

**Check 3: Bandwidth Saturation**

  Monitor shows: Interface at 100% utilization
  Problem: Too much traffic for link
  Solution: Upgrade to faster link or QoS

**Check 4: DNS Issues**

  Users report: Websites load slowly
  Test: nslookup is slow
  Problem: DNS server slow/overloaded
  Solution: Use faster DNS (8.8.8.8, 1.1.1.1)

**Scenario 4: DHCP Problems**

**Situation:**
10 new computers can't get IP addresses.

**Diagnosis:**

**Problem 1: Scope Exhausted**

  Check: show ip dhcp binding (router/server)
  Finding: All IPs assigned
  Solution: Expand scope range
    OR: Reduce lease time
    OR: Clear stale leases

**Problem 2: Rogue DHCP Server**

  Symptom: Clients getting wrong subnet
  Check: ipconfig /all on affected clients
  Finding: Gateway on different subnet
  Solution: 
    - Enable DHCP snooping on switches
    - Find and remove rogue server

**Problem 3: DHCP Server Down**

  Symptom: All clients getting APIPA
  Check: Can you ping DHCP server?
  Finding: DHCP server offline
  Solution: 
    - Restart DHCP service
    - Check server connectivity
    - Verify firewall rules

**Problem 4: Wrong VLAN**

  Symptom: Some clients can't get DHCP
  Check: Switch port VLAN assignment
  Finding: Clients on wrong VLAN
  Solution: Correct VLAN assignment

**🔧 Hands-On Practice Commands**

**Windows Network Commands:**

  ipconfig /all          - View IP configuration
  ipconfig /release      - Release DHCP lease
  ipconfig /renew        - Request new DHCP lease
  ipconfig /flushdns     - Clear DNS cache
  ipconfig /displaydns   - Show DNS cache

  ping [IP/hostname]     - Test connectivity
  tracert [IP/hostname]  - Trace route to destination
  nslookup [hostname]    - DNS lookup
  arp -a                 - View ARP cache
  netstat -an            - Show active connections
  route print            - Display routing table
  getmac                 - Display MAC address

**Linux Network Commands:**

  ip addr                - View IP configuration
  ip link                - View interface status
  ip route               - Display routing table
  dhclient -r            - Release DHCP lease
  dhclient               - Request new DHCP lease

  ping [IP/hostname]     - Test connectivity
  traceroute [IP/hostname] - Trace route
  dig [hostname]         - DNS lookup
  nslookup [hostname]    - DNS lookup (alternative)
  arp -a                 - View ARP cache
  netstat -an            - Show connections
  ss -tulpn              - Show listening ports

**Cisco Switch Commands:**

  show mac address-table           - View MAC table
  show interface status            - Interface overview
  show interface [interface]       - Detailed interface
  show vlan brief                  - VLAN information
  show spanning-tree               - STP status
  show port-security               - Security status
  show ip dhcp binding             - DHCP leases

**📝 Week 1 Practice Questions**

**Question Set 1: OSI Model**

1. Q: Which layer uses MAC addresses?
   A: Layer 2 (Data Link)

2. Q: Which layer provides end-to-end communication?
   A: Layer 4 (Transport)

3. Q: At which layer do routers operate?
   A: Layer 3 (Network)

4. Q: Which layer handles encryption?
   A: Layer 6 (Presentation)

5. Q: What is the PDU at Layer 2?
   A: Frame

**Question Set 2: Protocols & Ports**

1. Q: What port does HTTPS use?
   A: 443

2. Q: Which protocol uses TCP port 22?
   A: SSH/SFTP

3. Q: What is the DHCP DORA process?
   A: Discover → Offer → Request → Acknowledge

4. Q: Which is faster: TCP or UDP?
   A: UDP (but unreliable)

5. Q: What port does DNS use?
   A: 53 (TCP and UDP)

**Question Set 3: IP Addressing**

1. Q: How many usable hosts in /26?
   A: 62 hosts

2. Q: What is the private Class B range?
   A: 172.16.0.0 to 172.31.255.255

3. Q: What does 169.254.x.x indicate?
   A: APIPA - DHCP failed

4. Q: How many bits in IPv6?
   A: 128 bits

5. Q: What is the loopback address?
   A: 127.0.0.1 (IPv4) or ::1 (IPv6)

**Question Set 4: Switching**

1. Q: How many collision domains in 24-port switch?
   A: 24 (one per port)

2. Q: What is the broadcast MAC?
   A: FF:FF:FF:FF:FF:FF

3. Q: How many bytes in MAC address?
   A: 6 bytes (48 bits)

4. Q: What prevents switching loops?
   A: Spanning Tree Protocol (STP)

5. Q: What's better: full or half-duplex?
   A: Full-duplex (no collisions, double bandwidth)

**🎓 Study Strategies for Success**

**1. Daily Review (15 minutes)**
- Flashcards for port numbers
- Practice subnetting problems
- Review OSI layer functions

**2. Weekly Review (1 hour)**
- Complete practice exam
- Review missed questions
- Create summary notes

**3. Hands-On Practice**
- Use Packet Tracer or GNS3
- Build network topologies
- Configure devices
- Test connectivity

**4. Learning Techniques**

**Spaced Repetition:**
- Review Day 1 content on Days 3, 7, 14
- Review Day 2 content on Days 4, 8, 15
- Prevents forgetting!

**Active Recall:**
- Don't just re-read notes
- Test yourself without looking
- Explain concepts out loud
- Teach others

**Mnemonics:**
- OSI: "Please Do Not Throw Sausage Pizza Away"
- DHCP: "Don't Order Really Awful" food
- Create your own!

**5. Test-Taking Tips**

**For Network+:**
✅ Read entire question carefully
✅ Eliminate obviously wrong answers
✅ Watch for "BEST" vs "correct"
✅ Manage time (90 questions, 90 minutes)
✅ Flag and return to difficult questions
✅ Don't change answers unless certain

**Common Traps:**
❌ Confusing similar terms (hub vs switch vs router)
❌ Mixing up port numbers
❌ Forgetting to subtract 2 for usable hosts
❌ Mixing up TCP and UDP protocols
❌ Confusing duplex modes

**📊 Week 1 Performance Check**

Rate your understanding (1-5) for each topic:

**Networking Models**
- OSI 7 layers: ___/5
- TCP/IP model: ___/5
- Encapsulation: ___/5

**Protocols**
- TCP vs UDP: ___/5
- Port numbers: ___/5
- DHCP DORA: ___/5

**IP Addressing**
- Subnet calculation: ___/5
- Private addresses: ___/5
- IPv6 basics: ___/5

**Ethernet/Switching**
- MAC addresses: ___/5
- Switch operation: ___/5
- Collision domains: ___/5

**If any score below 3:**
- Review that day's material
- Do additional practice problems
- Watch supplementary videos
- Ask for help in study group

**🚀 Preparing for Week 2**

**Week 2 Preview:**
- Routing protocols (RIP, OSPF, EIGRP, BGP)
- VLANs and trunking
- Wireless networking (802.11)
- Advanced TCP/IP applications
- IPv6 deeper dive
- Network troubleshooting scenarios

**To Prepare:**
✅ Complete all Week 1 review questions
✅ Practice subnetting until comfortable
✅ Memorize all critical port numbers
✅ Understand OSI model perfectly
✅ Be able to explain TCP 3-way handshake
✅ Know DHCP DORA process by heart

**🎯 Week 1 Final Assessment**

Complete this assessment honestly:

**I can confidently:**
□ Name all 7 OSI layers and their functions
□ Explain encapsulation process
□ List 20+ port numbers from memory
□ Describe TCP 3-way handshake
□ Explain TCP vs UDP differences
□ Calculate subnet ranges
□ Determine network/broadcast addresses
□ Explain DHCP DORA process
□ Describe how switches learn MACs
□ Differentiate collision vs broadcast domains
□ Troubleshoot basic connectivity issues

**If you checked all boxes:** You're ready for Week 2! 🎉

**If you missed some:** Review those topics before continuing.

**Remember:**
✅ Networking is cumulative - master basics first
✅ Practice makes perfect, especially subnetting
✅ Hands-on experience beats reading alone
✅ Don't memorize - understand WHY things work
✅ Take breaks - your brain needs processing time

**You've completed Week 1! Great job! 🌟**

Keep this momentum going into Week 2. Remember - every networking professional started exactly where you are now. The key is consistent practice and never giving up!

**Key Takeaways for Week 1:**

✅ OSI and TCP/IP models provide troubleshooting framework
✅ TCP is reliable, UDP is fast - know when to use each
✅ Port numbers are critical - memorize common ones
✅ Subnetting is essential - practice daily
✅ DHCP automates IP configuration (DORA process)
✅ Switches use MAC addresses at Layer 2
✅ Full-duplex eliminates collisions
✅ Always troubleshoot bottom-up (Physical to Application)
✅ Documentation and labeling save time
✅ Understanding beats memorization

See you in Week 2! 🚀`,

  // TEXTBOOK CONTENT (Formal Academic Style) - PLACEHOLDER
  lesson_textbook: `**[TEXTBOOK CONTENT PLACEHOLDER]**

This section is reserved for formal academic review content covering Week 1 comprehensive material.

**Topics to be covered:**
- OSI Reference Model Comprehensive Review
- TCP/IP Protocol Suite Architecture
- Application Layer Protocol Analysis
- Transport Layer Mechanisms
- IPv4 and IPv6 Addressing Schemes
- Subnetting and VLSM Methodologies
- Dynamic Host Configuration Protocol
- Ethernet Standards and Frame Structure
- Switch Operation and MAC Address Learning
- Network Troubleshooting Methodologies
- Performance Analysis and Optimization
- Security Considerations at Each Layer

**Format will include:**
- Comprehensive concept summaries
- Review questions with detailed answers
- Practice scenarios with solutions
- Troubleshooting flowcharts
- Quick reference tables
- Memory aids and mnemonics
- Self-assessment tools
- Week 2 preparation guidance

**Paste your textbook review content here, following the formal academic structure seen in Day 1 and Day 2 modules.**`,

  // SUMMARY CONTENT
  lesson_summary: `**Week 1 Complete Summary**

**OSI Model (7 Layers):**
7-Application, 6-Presentation, 5-Session, 4-Transport, 3-Network, 2-Data Link, 1-Physical

**TCP/IP Model (4 Layers):**
Application, Transport, Internet, Link

**Critical Ports:**
20/21-FTP, 22-SSH, 23-Telnet, 25-SMTP, 53-DNS, 67/68-DHCP, 69-TFTP, 80-HTTP, 110-POP3, 123-NTP, 143-IMAP, 161/162-SNMP, 389-LDAP, 443-HTTPS, 445-SMB, 514-Syslog, 587-SMTPS, 3389-RDP

**TCP vs UDP:**
TCP: Reliable, connection-oriented, slow
UDP: Fast, connectionless, unreliable

**Common Subnets:**
/24=254h, /25=126h, /26=62h, /27=30h, /28=14h, /29=6h, /30=2h

**Private IPs:**
10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16

**Special Addresses:**
127.0.0.1-Loopback, 169.254.x.x-APIPA, 255.255.255.255-Broadcast

**DHCP DORA:**
Discover → Offer → Request → Acknowledge

**MAC Address:**
48 bits, format AA:BB:CC:DD:EE:FF, broadcast FF:FF:FF:FF:FF:FF

**Switch:**
Layer 2, MAC-based forwarding, per-port collision domains

**Ethernet:**
1000BASE-T (1Gbps), Cat6, full-duplex, 100m max

**Troubleshooting:**
Bottom-up: Physical→Data Link→Network→Transport→Application`,

  // QUIZ QUESTIONS - Comprehensive Week 1 Review
  quiz_questions: [
    {
      question: "Which OSI layer is responsible for logical addressing?",
      options: ["Data Link", "Network", "Transport", "Application"],
      correct_answer: "Network"
    },
    {
      question: "What is the correct order of the DHCP DORA process?",
      options: ["Discover, Offer, Request, Acknowledge", "Offer, Discover, Acknowledge, Request", "Request, Offer, Discover, Acknowledge", "Discover, Request, Offer, Acknowledge"],
      correct_answer: "Discover, Offer, Request, Acknowledge"
    },
    {
      question: "How many usable host addresses are in a /27 network?",
      options: ["14", "30", "62", "126"],
      correct_answer: "30"
    },
    {
      question: "Which protocol operates at the Transport layer and provides reliable delivery?",
      options: ["IP", "TCP", "UDP", "ICMP"],
      correct_answer: "TCP"
    },
    {
      question: "What does an IP address of 169.254.100.50 indicate?",
      options: ["Valid DHCP assignment", "APIPA - DHCP failed", "Private address", "Loopback"],
      correct_answer: "APIPA - DHCP failed"
    },
    {
      question: "At which layer do switches operate?",
      options: ["Physical", "Data Link", "Network", "Transport"],
      correct_answer: "Data Link"
    },
    {
      question: "What port does HTTPS use?",
      options: ["80", "443", "8080", "8443"],
      correct_answer: "443"
    },
    {
      question: "What is the broadcast MAC address?",
      options: ["00:00:00:00:00:00", "FF:FF:FF:FF:FF:FF", "AA:AA:AA:AA:AA:AA", "11:11:11:11:11:11"],
      correct_answer: "FF:FF:FF:FF:FF:FF"
    },
    {
      question: "Which cable category supports 10 Gigabit Ethernet at 100 meters?",
      options: ["Cat5e", "Cat6", "Cat6a", "Cat7"],
      correct_answer: "Cat6a"
    },
    {
      question: "What is the first step of the TCP three-way handshake?",
      options: ["ACK", "SYN", "SYN-ACK", "FIN"],
      correct_answer: "SYN"
    },
    {
      question: "How many collision domains does a 24-port switch have?",
      options: ["1", "12", "24", "48"],
      correct_answer: "24"
    },
    {
      question: "What is the default subnet mask for a Class C network?",
      options: ["255.0.0.0", "255.255.0.0", "255.255.255.0", "255.255.255.255"],
      correct_answer: "255.255.255.0"
    },
    {
      question: "Which protocol is used for secure file transfer?",
      options: ["FTP", "TFTP", "SFTP", "HTTP"],
      correct_answer: "SFTP"
    },
    {
      question: "What does full-duplex mean?",
      options: ["One-way communication", "Two-way, one at a time", "Two-way simultaneously", "Broadcast only"],
      correct_answer: "Two-way simultaneously"
    },
    {
      question: "At what percentage of lease time does DHCP client first attempt renewal?",
      options: ["25%", "50%", "75%", "87.5%"],
      correct_answer: "50%"
    }
  ],

  // FLASHCARDS - Week 1 Comprehensive Review
  flashcards: [
    { term: "OSI Model", definition: "7 layers: Application, Presentation, Session, Transport, Network, Data Link, Physical" },
    { term: "Encapsulation", definition: "Data→Segment→Packet→Frame→Bits" },
    { term: "TCP", definition: "Reliable, connection-oriented, SYN-SYN/ACK-ACK handshake" },
    { term: "UDP", definition: "Fast, connectionless, no guarantee" },
    { term: "Port 443", definition: "HTTPS - Secure web traffic" },
    { term: "Port 22", definition: "SSH/SFTP - Secure shell" },
    { term: "Port 53", definition: "DNS - Name resolution" },
    { term: "DHCP DORA", definition: "Discover→Offer→Request→Acknowledge" },
    { term: "/26 Subnet", definition: "255.255.255.192, 62 usable hosts" },
    { term: "Private IPs", definition: "10.x, 172.16-31.x, 192.168.x" },
    { term: "APIPA", definition: "169.254.x.x - DHCP failed" },
    { term: "MAC Address", definition: "48-bit hardware address, Layer 2" },
    { term: "Switch", definition: "Layer 2, MAC-based forwarding" },
    { term: "Collision Domain", definition: "One per switch port in full-duplex" },
    { term: "Broadcast Domain", definition: "All switch ports, router breaks it" },
    { term: "Full-Duplex", definition: "Send & receive simultaneously" },
    { term: "Cat6", definition: "Up to 10Gbps (55m), current standard" },
    { term: "STP", definition: "Spanning Tree Protocol - prevents loops" },
    { term: "ARP", definition: "Resolves IP to MAC address" },
    { term: "IPv6", definition: "128-bit address, hexadecimal" },
    { term: "Loopback", definition: "127.0.0.1 (IPv4) or ::1 (IPv6)" },
    { term: "MTU", definition: "Maximum Transmission Unit - 1500 bytes" },
    { term: "Subnet Formula", definition: "Hosts: 2^h - 2, Subnets: 2^n" },
    { term: "Store-and-Forward", definition: "Switch checks FCS before forwarding" },
    { term: "OSI Mnemonic", definition: "Please Do Not Throw Sausage Pizza Away" }
  ],

  gameType: 'week1-gauntlet',

  hands_on_exercise: `Week 1 Comprehensive Lab:

**Lab 1: Complete Network Setup**
1. Design small office network (30 devices)
2. Choose addressing scheme (192.168.x.0/24)
3. Configure DHCP scope
4. Document:
   - IP ranges
   - Static assignments
   - DHCP configuration
   - Network diagram

**Lab 2: Troubleshooting Challenge**
Simulate these problems and fix them:
1. No connectivity (cable unplugged)
2. Wrong IP (static misconfigured)
3. DHCP failure (APIPA address)
4. Can ping IP not hostname (DNS)
5. Slow network (duplex mismatch)

Document your troubleshooting steps!

**Lab 3: Protocol Analysis**
1. Capture traffic with Wireshark
2. Identify and analyze:
   - TCP three-way handshake
   - DNS query/response
   - DHCP DORA process
   - ARP request/reply
   - HTTP request/response
3. Screenshot and label each

**Lab 4: Subnetting Practice**
Complete 10 subnetting problems:
1. 192.168.1.0/24 into 4 subnets
2. 10.0.0.0/8 into 256 subnets
3. Identify subnet for 172.16.45.200/22
4. Calculate hosts for /28
5. Design VLSM for: 100h, 50h, 25h, 10h

**Lab 5: Switch Configuration**
If you have access to switch:
1. View MAC address table
2. Check port speeds
3. Enable port security
4. Document VLANs
5. Test STP

**Lab 6: Command Mastery**
Practice until fluent:
- ipconfig /all, /release, /renew
- ping, tracert, nslookup
- arp -a, netstat -an
- show commands (if switch access)

**Week 1 Final Project:**
Create comprehensive network documentation:
- Topology diagram
- IP addressing plan
- Port assignments
- Cable labeling scheme
- Troubleshooting procedures
- Contact information

Present as if training new technician!`
};

export default day7Module;