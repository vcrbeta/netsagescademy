// DAY 6: Ethernet Basics & Switching - COMPLETE MODULE

export const day6Module = {
  day: 6,
  module_title: "Ethernet Fundamentals & Layer 2 Switching",
  
  // CONVERSATIONAL CONTENT (Full Mode)
  lesson_content: `**Welcome to Day 6: Ethernet & Switching!**

Today we're diving into the Data Link layer - where Ethernet lives! We'll explore how switches work, MAC addresses, collision domains, and all the magic that happens at Layer 2. Let's get switching! 🔀

**🌐 What is Ethernet?**

Ethernet is THE dominant Layer 2 (Data Link) technology for LANs. Invented by Robert Metcalfe at Xerox in the 1970s, it's now the standard for wired networks worldwide.

**Why Ethernet Won:**
✅ Simple and reliable
✅ Inexpensive to implement
✅ Scalable from home to enterprise
✅ Continuous evolution (10Mbps to 400Gbps+)
✅ Widely supported by all vendors

**📊 Ethernet Standards - The IEEE 802.3 Family**

**10BASE-T** (10 Mbps)
- Speed: 10 Mbps
- Cable: Cat3 UTP
- Distance: 100 meters
- Connector: RJ-45
- Status: Obsolete
- Year: 1990

**100BASE-TX (Fast Ethernet)** ⭐
- Speed: 100 Mbps
- Cable: Cat5/5e UTP
- Distance: 100 meters
- Connector: RJ-45
- Status: Still common in older networks
- Year: 1995

**1000BASE-T (Gigabit Ethernet)** ⭐⭐
- Speed: 1 Gbps (1000 Mbps)
- Cable: Cat5e/Cat6 UTP
- Distance: 100 meters
- Connector: RJ-45
- Status: Current standard for desktops
- Year: 1999

**10GBASE-T (10 Gigabit Ethernet)** ⭐⭐⭐
- Speed: 10 Gbps
- Cable: Cat6a/Cat7 UTP
- Distance: 100 meters
- Connector: RJ-45
- Status: Server/backbone standard
- Year: 2006

**Fiber Optic Ethernet:**

**1000BASE-SX** (Short Range)
- Speed: 1 Gbps
- Cable: Multimode fiber
- Distance: 550 meters
- Connector: LC/SC

**1000BASE-LX** (Long Range)
- Speed: 1 Gbps
- Cable: Single-mode fiber
- Distance: 5 kilometers (can go 10km)
- Connector: LC/SC

**10GBASE-SR** (Short Range)
- Speed: 10 Gbps
- Cable: Multimode fiber
- Distance: 300 meters
- Connector: LC

**10GBASE-LR** (Long Range)
- Speed: 10 Gbps
- Cable: Single-mode fiber
- Distance: 10 kilometers
- Connector: LC

**Higher Speeds:**
- **40GBASE** - 40 Gbps
- **100GBASE** - 100 Gbps
- **400GBASE** - 400 Gbps (data centers)

**🔌 Ethernet Cables - The Physical Connection**

**Twisted Pair (UTP/STP):**

**Cat5e** (Enhanced Category 5)
- Speed: Up to 1 Gbps
- Frequency: 100 MHz
- Distance: 100 meters
- Use: Gigabit Ethernet
- Status: Minimum acceptable today

**Cat6** ⭐
- Speed: Up to 10 Gbps (short runs)
- Frequency: 250 MHz
- Distance: 55m @ 10Gbps, 100m @ 1Gbps
- Use: Current standard
- Better crosstalk protection than Cat5e

**Cat6a** (Augmented) ⭐⭐
- Speed: 10 Gbps
- Frequency: 500 MHz
- Distance: 100 meters @ 10Gbps
- Use: 10GbE installations
- Thicker, less flexible than Cat6

**Cat7**
- Speed: 10 Gbps+
- Frequency: 600 MHz
- Shielded (STP)
- Not widely adopted
- Requires different connectors

**Cat8**
- Speed: 40 Gbps
- Frequency: 2000 MHz
- Distance: 30 meters
- Use: Data center short runs

**Cable Pinout - T568A vs T568B:**

**T568B (More Common):**

  Pin 1: Orange/White
  Pin 2: Orange
  Pin 3: Green/White
  Pin 4: Blue
  Pin 5: Blue/White
  Pin 6: Green
  Pin 7: Brown/White
  Pin 8: Brown

**T568A (Less Common):**

  Pin 1: Green/White
  Pin 2: Green
  Pin 3: Orange/White
  Pin 4: Blue
  Pin 5: Blue/White
  Pin 6: Orange
  Pin 7: Brown/White
  Pin 8: Brown

**Straight-Through Cable:**
- Same pinout both ends (T568B ↔ T568B)
- Connects different device types:
  - PC to switch
  - Router to switch
  - Server to switch

**Crossover Cable:**
- Different pinouts each end (T568A ↔ T568B)
- Connects same device types:
  - PC to PC
  - Switch to switch
  - Router to router
- **Note:** Modern devices have Auto-MDIX (auto-detect)

**📦 Ethernet Frame Structure**

An Ethernet frame is the Data Link layer packet:

  ┌─────────────┬─────────┬──────────┬────────┬─────┬─────┐
  │  Preamble   │   SFD   │   Dest   │  Source│Type │Data │ FCS│
  │   7 bytes   │ 1 byte  │   MAC    │  MAC   │     │     │    │
  │             │         │  6 bytes │6 bytes │2 by │46-1500│4 by│
  └─────────────┴─────────┴──────────┴────────┴─────┴─────┘

**Preamble (7 bytes):**
- 10101010 repeated 7 times
- Clock synchronization
- "Hey! Frame coming!"

**Start Frame Delimiter (SFD) (1 byte):**
- 10101011
- "Frame starts NOW!"

**Destination MAC Address (6 bytes):**
- Where frame is going
- Example: AA:BB:CC:DD:EE:FF

**Source MAC Address (6 bytes):**
- Where frame came from
- Example: 11:22:33:44:55:66

**EtherType/Length (2 bytes):**
- Type of payload:
  - 0x0800 = IPv4
  - 0x0806 = ARP
  - 0x86DD = IPv6

**Data (46-1500 bytes):**
- Actual payload
- Minimum 46 bytes (padded if smaller)
- Maximum 1500 bytes (MTU)

**Frame Check Sequence (FCS) (4 bytes):**
- CRC (Cyclic Redundancy Check)
- Error detection
- Calculated over entire frame
- Receiver recalculates and compares

**Total Frame Size:**
- Minimum: 64 bytes (with padding)
- Maximum: 1518 bytes (without VLAN tag)
- Maximum: 1522 bytes (with 802.1Q VLAN tag)

**🏷️ MAC Addresses - Hardware Identities**

**MAC Address Structure:**

48 bits (6 bytes) in hexadecimal:

  AA:BB:CC:DD:EE:FF
  └──OUI──┘ └─NIC─┘

**OUI (Organizationally Unique Identifier):**
- First 24 bits (3 bytes)
- Identifies manufacturer
- Example:
  - 00:1A:A0 = Dell
  - 00:50:56 = VMware
  - 00:0C:29 = VMware

**NIC Specific:**
- Last 24 bits (3 bytes)
- Unique to that device
- Assigned by manufacturer

**Special MAC Addresses:**

**Broadcast MAC:**

  FF:FF:FF:FF:FF:FF

- All 1s in binary
- Goes to every device
- Used for ARP, DHCP Discover

**Multicast MAC:**

  01:00:5E:XX:XX:XX (IPv4 multicast)
  33:33:XX:XX:XX:XX (IPv6 multicast)

- First bit of first byte = 1
- Goes to group of devices

**Unicast MAC:**
- First bit of first byte = 0
- Goes to single device
- Most common type

**🔀 Switches - The Traffic Directors**

**What is a Switch?**

A switch is a Layer 2 device that:
- Forwards frames based on MAC addresses
- Learns MAC addresses dynamically
- Creates separate collision domains per port
- Operates at wire speed
- Full-duplex communication

**How Switches Work:**

**Step 1: Learning**

When frame arrives:
1. Switch reads SOURCE MAC
2. Associates MAC with incoming port
3. Stores in MAC address table (CAM table)
4. Entry has timeout (typically 300 seconds)

**Step 2: Forwarding Decision**

Switch looks at DESTINATION MAC:
- If in MAC table → forward out specific port (unicast)
- If not in table → flood out all ports except incoming (unknown unicast)
- If broadcast (FF:FF:FF:FF:FF:FF) → flood all ports

**Step 3: Filtering**

- Switch only forwards where needed
- Reduces network congestion
- Improves security (frames not sent everywhere)

**MAC Address Table Example:**

  Port  | MAC Address       | VLAN | Age
  ------|-------------------|------|-----
  Gi0/1 | AA:BB:CC:DD:EE:01 | 1    | 120
  Gi0/2 | AA:BB:CC:DD:EE:02 | 1    | 45
  Gi0/3 | AA:BB:CC:DD:EE:03 | 10   | 280
  Gi0/24| AA:BB:CC:DD:EE:FF | 1    | 15

**Switch Forwarding Methods:**

**Store-and-Forward:**
- Receives entire frame
- Checks FCS (error detection)
- Drops bad frames
- Slowest but most reliable
- Most common today

**Cut-Through:**
- Forwards after reading destination MAC (first 6 bytes)
- Doesn't check for errors
- Fastest forwarding
- Propagates bad frames

**Fragment-Free:**
- Reads first 64 bytes
- Catches collision fragments
- Compromise between the two

**⚡ Collision Domains & Broadcast Domains**

**Collision Domain:**

Area where two devices CAN collide:
- **Hub:** Single collision domain (bad!)
  - All devices share bandwidth
  - Only one can transmit at a time
  - Collisions detected by CSMA/CD

- **Switch:** Separate collision domain per port (good!)
  - Each device has full bandwidth
  - No collisions in full-duplex
  - Much better performance

**Broadcast Domain:**

Area where broadcast frames are forwarded:
- **Hub:** Single broadcast domain
- **Switch:** Single broadcast domain (by default)
  - All ports in same VLAN = one broadcast domain
  - Broadcasts flood all ports
  - Can be large problem in big networks

- **Router:** Breaks up broadcast domains
  - Each router interface = separate broadcast domain
  - Broadcasts don't cross routers

**CSMA/CD (Carrier Sense Multiple Access/Collision Detection):**

The old Ethernet collision protocol:
1. **Carrier Sense:** Listen before transmitting
2. **Multiple Access:** Multiple devices can access medium
3. **Collision Detection:** Detect if collision occurred

**How it worked:**
1. Device wants to send
2. Listens - is medium free?
3. If yes, transmit
4. While transmitting, listen for collision
5. If collision:
   - Send jam signal (stop everyone!)
   - Wait random time (backoff)
   - Try again

**Today:**
- Full-duplex switching = No collisions!
- CSMA/CD obsolete on switches
- Still used on half-duplex (rare)

**🎨 Switch Features**

**Full-Duplex:**
- Transmit and receive simultaneously
- Dedicated send/receive channels
- No collisions possible
- Doubled bandwidth
- Standard on modern networks

**Half-Duplex:**
- Either transmit OR receive
- Not both simultaneously
- Collisions possible
- Lower performance
- Rare today

**Auto-Negotiation:**
- Switches and NICs negotiate:
  - Speed (10/100/1000 Mbps)
  - Duplex (half/full)
- Usually works great
- Can force speed/duplex if issues

**Port Speeds:**
- 10 Mbps (ancient)
- 100 Mbps (Fast Ethernet)
- 1 Gbps (Gigabit) ⭐
- 10 Gbps (10 Gigabit) ⭐⭐
- 25/40/100 Gbps (Data center)

**Spanning Tree Protocol (STP):**

**The Problem:**
- Network loops cause broadcast storms
- Frames circle network infinitely
- Network melts down!

**The Solution:**
STP creates loop-free topology:
1. Elects root bridge
2. Calculates best path to root
3. Blocks redundant paths
4. If link fails, unblocks backup

**Port States:**
- **Forwarding:** Normal operation
- **Blocking:** Redundant path blocked
- **Learning:** Building MAC table
- **Listening:** Selecting root bridge

**Modern STP:**
- **RSTP (Rapid Spanning Tree):** Faster convergence
- **MSTP (Multiple Spanning Tree):** Per-VLAN STP
- **PVST+ (Per-VLAN Spanning Tree+):** Cisco proprietary

**Port Security:**

Limits which MAC addresses can connect:

  switchport port-security
  switchport port-security maximum 2
  switchport port-security mac-address sticky
  switchport port-security violation shutdown

**Violations:**
- **Shutdown:** Port disables (default)
- **Restrict:** Drops frames, logs
- **Protect:** Drops frames, no log

**Storm Control:**

Prevents broadcast/multicast storms:
- Limits % of bandwidth for broadcasts
- Limits % for multicasts
- Limits % for unknown unicasts
- Prevents network meltdown

**🌉 Hubs vs Switches vs Routers**

**Hub (Layer 1):**
❌ Repeats signal to all ports
❌ Single collision domain
❌ Single broadcast domain
❌ Half-duplex only
❌ Shares bandwidth
❌ Obsolete - don't use!

**Switch (Layer 2):**
✅ Forwards based on MAC address
✅ Separate collision domain per port
❌ Single broadcast domain (per VLAN)
✅ Full-duplex
✅ Dedicated bandwidth per port
✅ Standard for LANs

**Router (Layer 3):**
✅ Routes based on IP address
✅ Separate collision domain per port
✅ Separate broadcast domain per port
✅ Connects different networks
✅ Provides security/firewall
✅ Requires separate purchase (usually)

**Layer 3 Switch:**
✅ Switch + routing capability
✅ Faster than router for inter-VLAN
✅ Best of both worlds
✅ More expensive than Layer 2 switch

**🔍 Troubleshooting Ethernet & Switches**

**Problem: No Link Light**

**Symptoms:**
- No green light on NIC/switch port
- No connectivity

**Causes & Solutions:**
- Bad cable → Test with cable tester
- Wrong cable type → Try different cable
- Port disabled → Enable port
- Bad NIC/port → Try different port/NIC
- Switch powered off → Check power

**Problem: Slow Network Performance**

**Causes:**
- Duplex mismatch (full/half)
- Speed mismatch
- Bad cable (errors)
- Network congestion
- Broadcast storm

**Diagnosis:**

  show interface status          # Check speed/duplex
  show interface counters errors # Check error counts
  show mac address-table         # Verify MAC learning

**Problem: Intermittent Connectivity**

**Causes:**
- Loose cable connection
- Marginal cable (passes test barely)
- Duplex mismatch
- Switch port flapping
- STP reconvergence

**Problem: Can't Reach Devices**

**Check:**
1. Link light on?
2. Correct VLAN?
3. Cable good?
4. Switch port enabled?
5. Port security violation?
6. MAC address learned?

**Commands:**

  show interfaces               # Interface status
  show mac address-table       # MAC learning
  show vlan brief              # VLAN membership
  show spanning-tree           # STP status
  show port-security           # Security violations

**🎓 Best Practices**

**Cabling:**
✅ Use Cat6 minimum for new installations
✅ Label both ends of cables
✅ Use cable management
✅ Test all cables before deployment
✅ Keep cable runs under 100m
✅ Avoid running near electrical lines

**Switch Configuration:**
✅ Enable port security on edge ports
✅ Disable unused ports
✅ Use VLANs to segment traffic
✅ Enable storm control
✅ Configure DHCP snooping
✅ Document MAC-to-port mappings
✅ Monitor switch CPU/memory

**Network Design:**
✅ Use full-duplex everywhere
✅ Avoid daisy-chaining switches
✅ Plan for growth (extra ports/capacity)
✅ Implement redundant uplinks
✅ Use fiber for long runs
✅ Separate voice/data VLANs

**Key Takeaways:**

✅ Ethernet is the dominant Layer 2 LAN technology
✅ MAC addresses are 48-bit hardware addresses
✅ Switches forward frames based on MAC addresses
✅ Switches learn MAC addresses dynamically
✅ Each switch port is separate collision domain
✅ Full-duplex eliminates collisions
✅ Store-and-forward is most common switching method
✅ STP prevents network loops
✅ Modern standard: Gigabit (1 Gbps) for desktops
✅ Cat5e minimum, Cat6/6a preferred
✅ Always use straight-through cables for PC-to-switch
✅ Switches don't break up broadcast domains (routers do)

You're now an Ethernet and switching expert! 🎓`,

  // TEXTBOOK CONTENT (Formal Academic Style) - PLACEHOLDER
  lesson_textbook: `**[TEXTBOOK CONTENT PLACEHOLDER]**

This section is reserved for formal academic textbook content covering Ethernet Fundamentals and Layer 2 Switching.

**Topics to be covered:**
- IEEE 802.3 Ethernet Standards Evolution
- Ethernet Frame Structure and Encapsulation
- MAC Address Architecture and Assignment
- Switched Ethernet Network Design
- Bridge and Switch Operation Principles
- MAC Address Learning and Forwarding
- Collision Domains and Broadcast Domains
- CSMA/CD Protocol (Historical Context)
- Full-Duplex and Half-Duplex Operation
- Spanning Tree Protocol (STP/RSTP/MSTP)
- Switch Port Security and Storm Control
- Ethernet Cable Standards (Cat5e/6/6a/7)
- Copper and Fiber Optic Media
- Troubleshooting Layer 2 Networks
- Performance Optimization Techniques

**Format will include:**
- Formal definitions and terminology
- IEEE 802.3 standard references
- Detailed frame format diagrams
- Switching algorithms
- Network design principles
- Protocol specifications
- Performance calculations
- Troubleshooting methodologies
- Configuration examples
- Best practices

**Paste your textbook content here, following the formal academic structure seen in Day 1 and Day 2 modules.**`,

  // SUMMARY CONTENT
  lesson_summary: `**Quick Summary: Ethernet & Switching**

**Ethernet Standards:**
- 100BASE-TX - 100 Mbps, Cat5/5e, 100m
- 1000BASE-T - 1 Gbps, Cat5e/6, 100m ⭐
- 10GBASE-T - 10 Gbps, Cat6a, 100m

**Cable Categories:**
- Cat5e - Up to 1 Gbps, minimum acceptable
- Cat6 - Up to 10 Gbps (55m), current standard
- Cat6a - 10 Gbps @ 100m, best for new installs

**Cable Types:**
- Straight-through - Different devices (PC-Switch)
- Crossover - Same devices (Switch-Switch)
- Auto-MDIX - Auto-detects cable type

**Ethernet Frame:**
- Preamble (7) + SFD (1)
- Destination MAC (6)
- Source MAC (6)
- EtherType (2)
- Data (46-1500)
- FCS (4)
- Total: 64-1518 bytes

**MAC Address:**
- 48 bits (6 bytes)
- Format: AA:BB:CC:DD:EE:FF
- First 24 bits = OUI (manufacturer)
- Last 24 bits = NIC specific
- Broadcast: FF:FF:FF:FF:FF:FF

**Switch Operation:**
1. **Learn** - Read source MAC, store with port
2. **Forward** - Send to specific port (if known)
3. **Flood** - Send all ports (if unknown/broadcast)
4. **Filter** - Don't forward back to source

**Switch Methods:**
- Store-and-Forward - Checks FCS, most reliable ⭐
- Cut-Through - Fast, no error checking
- Fragment-Free - Reads 64 bytes

**Collision vs Broadcast Domains:**

**Collision Domain:**
- Hub - All ports share (bad!)
- Switch - One per port (good!)
- Full-duplex - No collisions

**Broadcast Domain:**
- Hub - All ports
- Switch - All ports (same VLAN)
- Router - Separate per interface

**Full vs Half-Duplex:**
- Full-Duplex - Send & receive simultaneously ⭐
- Half-Duplex - Send OR receive, collisions possible

**STP (Spanning Tree Protocol):**
- Prevents network loops
- Blocks redundant paths
- Unblocks if link fails
- Port states: Forwarding, Blocking, Learning

**Port Security:**
- Limits MAC addresses per port
- Violations: Shutdown, Restrict, Protect
- Sticky MAC learning

**Common Issues:**
- No link light = Bad cable/port
- Slow performance = Duplex mismatch
- Intermittent = Loose cable, STP

**Hub vs Switch vs Router:**
- Hub (L1) - Repeat, share bandwidth, obsolete
- Switch (L2) - MAC-based, per-port collision domain
- Router (L3) - IP-based, separates broadcast domains

**Best Practices:**
✅ Cat6 minimum for new installs
✅ Full-duplex everywhere
✅ Enable port security
✅ Disable unused ports
✅ Label all cables
✅ Use VLANs for segmentation
✅ Monitor for errors`,

  // QUIZ QUESTIONS
  quiz_questions: [
    {
      question: "What OSI layer does a switch operate at?",
      options: ["Layer 1 - Physical", "Layer 2 - Data Link", "Layer 3 - Network", "Layer 4 - Transport"],
      correct_answer: "Layer 2 - Data Link"
    },
    {
      question: "How many bytes is a MAC address?",
      options: ["4", "6", "8", "12"],
      correct_answer: "6"
    },
    {
      question: "What is the broadcast MAC address?",
      options: ["00:00:00:00:00:00", "FF:FF:FF:FF:FF:FF", "AA:AA:AA:AA:AA:AA", "01:01:01:01:01:01"],
      correct_answer: "FF:FF:FF:FF:FF:FF"
    },
    {
      question: "What cable category supports 10 Gigabit Ethernet at 100 meters?",
      options: ["Cat5", "Cat5e", "Cat6", "Cat6a"],
      correct_answer: "Cat6a"
    },
    {
      question: "What type of cable connects a PC to a switch?",
      options: ["Crossover", "Straight-through", "Rollover", "Null modem"],
      correct_answer: "Straight-through"
    },
    {
      question: "What is the maximum frame size for standard Ethernet?",
      options: ["64 bytes", "512 bytes", "1518 bytes", "9000 bytes"],
      correct_answer: "1518 bytes"
    },
    {
      question: "What switching method checks for errors before forwarding?",
      options: ["Cut-through", "Store-and-forward", "Fragment-free", "Fast-forward"],
      correct_answer: "Store-and-forward"
    },
    {
      question: "What protocol prevents switching loops?",
      options: ["STP", "DHCP", "ARP", "ICMP"],
      correct_answer: "STP"
    },
    {
      question: "How many collision domains does a 24-port switch create?",
      options: ["1", "12", "24", "48"],
      correct_answer: "24"
    },
    {
      question: "What is the first 24 bits of a MAC address called?",
      options: ["OUI", "NIC", "Vendor ID", "Device ID"],
      correct_answer: "OUI"
    },
    {
      question: "What is full-duplex communication?",
      options: ["One-way only", "Two-way, one at a time", "Two-way simultaneously", "Broadcast only"],
      correct_answer: "Two-way simultaneously"
    },
    {
      question: "What device breaks up both collision and broadcast domains?",
      options: ["Hub", "Switch", "Router", "Access Point"],
      correct_answer: "Router"
    },
    {
      question: "What is the typical timeout for MAC address table entries?",
      options: ["60 seconds", "300 seconds", "3600 seconds", "Never expires"],
      correct_answer: "300 seconds"
    },
    {
      question: "What Ethernet standard provides 1 Gbps over copper?",
      options: ["100BASE-TX", "1000BASE-T", "10GBASE-T", "1000BASE-SX"],
      correct_answer: "1000BASE-T"
    },
    {
      question: "What happens when a switch receives a frame with an unknown destination MAC?",
      options: ["Drops the frame", "Floods to all ports except source", "Sends to router", "Stores for later"],
      correct_answer: "Floods to all ports except source"
    }
  ],

  // FLASHCARDS
  flashcards: [
    { term: "Ethernet", definition: "Dominant Layer 2 LAN technology, IEEE 802.3 standard" },
    { term: "MAC Address", definition: "48-bit (6-byte) hardware address: AA:BB:CC:DD:EE:FF" },
    { term: "OUI", definition: "Organizationally Unique Identifier - first 24 bits of MAC" },
    { term: "Switch", definition: "Layer 2 device, forwards based on MAC addresses" },
    { term: "Collision Domain", definition: "Area where frames can collide - one per switch port" },
    { term: "Broadcast Domain", definition: "Area where broadcasts are forwarded - all switch ports" },
    { term: "Full-Duplex", definition: "Send and receive simultaneously, no collisions" },
    { term: "Half-Duplex", definition: "Send OR receive, not both, collisions possible" },
    { term: "Store-and-Forward", definition: "Switch receives full frame, checks errors" },
    { term: "Cut-Through", definition: "Switch forwards after reading destination MAC" },
    { term: "Broadcast MAC", definition: "FF:FF:FF:FF:FF:FF - goes to all devices" },
    { term: "Ethernet Frame", definition: "Layer 2 packet: Preamble, MACs, Type, Data, FCS" },
    { term: "FCS", definition: "Frame Check Sequence - CRC for error detection" },
    { term: "100BASE-TX", definition: "Fast Ethernet - 100 Mbps, Cat5/5e, 100m" },
    { term: "1000BASE-T", definition: "Gigabit Ethernet - 1 Gbps, Cat5e/6, 100m" },
    { term: "10GBASE-T", definition: "10 Gigabit Ethernet - 10 Gbps, Cat6a, 100m" },
    { term: "Cat5e", definition: "Up to 1 Gbps, 100 MHz, minimum acceptable" },
    { term: "Cat6", definition: "Up to 10 Gbps (55m), 250 MHz, current standard" },
    { term: "Cat6a", definition: "10 Gbps @ 100m, 500 MHz, best for new installs" },
    { term: "Straight-Through Cable", definition: "Same pinout both ends, different devices" },
    { term: "Crossover Cable", definition: "Different pinouts, same device types" },
    { term: "STP", definition: "Spanning Tree Protocol - prevents switching loops" },
    { term: "Port Security", definition: "Limits which MAC addresses can connect to port" },
    { term: "MAC Address Table", definition: "Switch database: Port → MAC associations" },
    { term: "Auto-MDIX", definition: "Auto-detects and adjusts for cable type" },
    { term: "MTU", definition: "Maximum Transmission Unit - 1500 bytes for Ethernet" }
  ],

  gameType: 'ethernet-master',

  hands_on_exercise: `Ethernet & Switching Lab Exercises:

**Exercise 1: View MAC Address**
Windows:
- ipconfig /all - Find "Physical Address"
- getmac - Show all adapters

Linux/Mac:
- ip link show - View MAC addresses
- ifconfig - Alternative method

Document your MAC address and identify the OUI (first 3 bytes).
Lookup the manufacturer at: https://www.macvendors.com

**Exercise 2: View ARP Table (MAC to IP)**
Windows:
- arp -a - Display ARP table
- arp -d - Clear ARP cache
- ping [IP] - Generate ARP entry
- arp -a - View new entry

Note: ARP maps IP addresses to MAC addresses

**Exercise 3: Test Cable Connection**
1. Check link light on NIC
2. Check link speed:
   - Windows: Network adapter properties
   - Linux: ethtool eth0
3. Verify full-duplex mode
4. Check for errors:
   - Windows: netsh interface ipv4 show interfaces
   - Linux: ethtool -S eth0

**Exercise 4: Analyze Ethernet with Wireshark**
1. Start Wireshark capture
2. Filter: eth
3. Click any frame
4. Expand "Ethernet II" section
5. Identify:
   - Destination MAC
   - Source MAC
   - EtherType
6. Find your MAC in frames

**Exercise 5: Switch Port Speed Test**
If you have access to a managed switch:
1. Login to switch CLI
2. Run: show interface status
3. Document:
   - Port speeds
   - Duplex settings
   - VLAN assignments
4. Run: show mac address-table
5. Find your MAC address
6. Note which port you're on

**Exercise 6: Cable Testing**
If available:
1. Use cable tester
2. Test straight-through cable
3. Verify all 8 wires
4. Test cable length
5. Check for splits/shorts
6. Document results

**Bonus: Build a Cable**
With proper tools:
1. Cut Cat6 cable to length
2. Strip outer jacket (1 inch)
3. Untwist pairs
4. Arrange in T568B order:
   O/W, O, G/W, B, B/W, G, Br/W, Br
5. Trim evenly
6. Insert into RJ-45
7. Crimp connector
8. Test with cable tester
9. Repeat for other end
10. Test connectivity`
};

export default day6Module;