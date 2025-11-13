// DAY 4: IPv4/IPv6 Addressing & Subnetting - COMPLETE MODULE

export const day4Module = {
  day: 4,
  module_title: "IPv4/IPv6 Addressing & Subnetting Mastery",
  
  // CONVERSATIONAL CONTENT (Full Mode)
  lesson_content: `**Welcome to Day 4: IP Addressing & Subnetting!**

Today we're diving into one of the MOST IMPORTANT topics for Network+: IP addressing and subnetting! This is where many students struggle, but we're going to break it down step-by-step until it clicks. Ready? Let's go!

**🌐 Understanding IP Addresses - The Foundation**

An IP address is like a postal address for your computer on a network. Just like 123 Main St, City, State, ZIP helps the post office deliver mail, an IP address helps routers deliver data packets.

**IPv4 Structure:**

An IPv4 address is **32 bits** divided into **4 octets** (8 bits each):

192.168.1.100
[8 bits].[8 bits].[8 bits].[8 bits]

Each octet can be 0-255 (that's 2^8 = 256 possibilities per octet!)

**Binary to Decimal Conversion:**

Let's break down 192.168.1.100 in binary:

192      = 11000000
168      = 10101000
1        = 00000001
100      = 01100100

**Binary Place Values:**

128 | 64 | 32 | 16 | 8 | 4 | 2 | 1

Example: Converting 192 to binary
- 192 ÷ 128 = 1 remainder 64  →  **1**
- 64 ÷ 64 = 1 remainder 0     →  **1**
- No 32, 16, 8, 4, 2, or 1    →  **0 0 0 0 0 0**
Result: **11000000**

**🏘️ IP Address Classes - The Old Way**

Originally, IP addresses were divided into classes:

**Class A:**
- Range: 1.0.0.0 to 126.255.255.255
- First bit: 0
- Default mask: 255.0.0.0 (/8)
- Networks: 126 (huge networks)
- Hosts per network: 16,777,214
- Used for: Very large organizations

**Class B:**
- Range: 128.0.0.0 to 191.255.255.255
- First two bits: 10
- Default mask: 255.255.0.0 (/16)
- Networks: 16,384 (medium networks)
- Hosts per network: 65,534
- Used for: Medium to large organizations

**Class C:**
- Range: 192.0.0.0 to 223.255.255.255
- First three bits: 110
- Default mask: 255.255.255.0 (/24)
- Networks: 2,097,152 (small networks)
- Hosts per network: 254
- Used for: Small organizations, home networks

**Class D:**
- Range: 224.0.0.0 to 239.255.255.255
- First four bits: 1110
- Purpose: Multicast addresses
- No host addresses

**Class E:**
- Range: 240.0.0.0 to 255.255.255.255
- First four bits: 1111
- Purpose: Experimental, reserved
- Never used in production

**Special Addresses:**

**Loopback:**
- 127.0.0.0/8 (entire range)
- 127.0.0.1 is most common
- "Ping yourself" - tests TCP/IP stack
- Never leaves the computer

**Private (RFC 1918) Addresses:**
- **Class A:** 10.0.0.0 to 10.255.255.255 (/8)
- **Class B:** 172.16.0.0 to 172.31.255.255 (/12)
- **Class C:** 192.168.0.0 to 192.168.255.255 (/16)
- Not routable on Internet
- Must use NAT to reach Internet

**APIPA (Automatic Private IP Addressing):**
- 169.254.0.0/16 (169.254.0.1 to 169.254.255.254)
- Self-assigned when DHCP fails
- Only for local link communication
- If you see this, DHCP is broken!

**Broadcast Addresses:**
- **Limited broadcast:** 255.255.255.255
  - Stays on local network
  - Routers don't forward
  
- **Directed broadcast:** Last IP in subnet
  - Example: 192.168.1.255 for 192.168.1.0/24
  - Can be forwarded by routers (if configured)

**🎭 Subnet Masks - The Key to Subnetting**

A subnet mask tells us: "Which part is the network? Which part is the host?"

**Default Subnet Masks:**
- Class A: 255.0.0.0 = /8
- Class B: 255.255.0.0 = /16
- Class C: 255.255.255.0 = /24

**Subnet Mask in Binary:**

255.255.255.0 = 11111111.11111111.11111111.00000000

Network bits = 1
Host bits = 0

**CIDR Notation (Classless Inter-Domain Routing):**

Instead of writing 255.255.255.0, we write **/24**
- /24 means 24 network bits
- Remaining bits (32-24=8) are host bits

**Common CIDR Notations:**
- /8 = 255.0.0.0
- /16 = 255.255.0.0
- /24 = 255.255.255.0
- /25 = 255.255.255.128
- /26 = 255.255.255.192
- /27 = 255.255.255.224
- /28 = 255.255.255.240
- /29 = 255.255.255.248
- /30 = 255.255.255.252
- /31 = 255.255.255.254 (point-to-point)
- /32 = 255.255.255.255 (single host)

**📊 Subnetting Magic - The Powers of 2**

**Memorize These Powers of 2:**

2^1 = 2
2^2 = 4
2^3 = 8
2^4 = 16
2^5 = 32
2^6 = 64
2^7 = 128
2^8 = 256

**The Subnetting Formula:**

**Number of Subnets:** 2^n (where n = borrowed bits)
**Number of Hosts per Subnet:** 2^h - 2 (where h = host bits)
- Subtract 2 for network and broadcast addresses

**Subnet Mask Cheat Sheet:**

/24 = 255.255.255.0    → 256 addresses → 254 hosts → 1 subnet
/25 = 255.255.255.128  → 128 addresses → 126 hosts → 2 subnets
/26 = 255.255.255.192  → 64 addresses  → 62 hosts  → 4 subnets
/27 = 255.255.255.224  → 32 addresses  → 30 hosts  → 8 subnets
/28 = 255.255.255.240  → 16 addresses  → 14 hosts  → 16 subnets
/29 = 255.255.255.248  → 8 addresses   → 6 hosts   → 32 subnets
/30 = 255.255.255.252  → 4 addresses   → 2 hosts   → 64 subnets

**🎯 Subnetting Example 1: Basic Subnetting**

**Problem:** Subnet 192.168.1.0/24 into 4 subnets

**Step 1: How many bits to borrow?**
- Need 4 subnets
- 2^2 = 4, so borrow 2 bits

**Step 2: New subnet mask**
- Original: /24 (255.255.255.0)
- Borrowed: 2 bits
- New mask: /26 (255.255.255.192)

**Step 3: Block size**
- 256 - 192 = 64
- Each subnet has 64 addresses

**Step 4: Subnet ranges**

Subnet 1: 192.168.1.0/26
  Network:    192.168.1.0
  First host: 192.168.1.1
  Last host:  192.168.1.62
  Broadcast:  192.168.1.63

Subnet 2: 192.168.1.64/26
  Network:    192.168.1.64
  First host: 192.168.1.65
  Last host:  192.168.1.126
  Broadcast:  192.168.1.127

Subnet 3: 192.168.1.128/26
  Network:    192.168.1.128
  First host: 192.168.1.129
  Last host:  192.168.1.190
  Broadcast:  192.168.1.191

Subnet 4: 192.168.1.192/26
  Network:    192.168.1.192
  First host: 192.168.1.193
  Last host:  192.168.1.254
  Broadcast:  192.168.1.255

**🎯 Subnetting Example 2: VLSM (Variable Length Subnet Masking)**

**Problem:** You need:
- 1 subnet with 100 hosts
- 2 subnets with 50 hosts each
- 1 subnet with 25 hosts

**Solution Strategy:** Start with largest subnet first!

**Subnet 1 (100 hosts):**
- Need 100 hosts → 2^7 = 128 addresses
- 128 addresses = /25 (255.255.255.128)
- Range: 192.168.1.0/25 to 192.168.1.127/25

**Subnet 2 (50 hosts):**
- Need 50 hosts → 2^6 = 64 addresses
- 64 addresses = /26 (255.255.255.192)
- Range: 192.168.1.128/26 to 192.168.1.191/26

**Subnet 3 (50 hosts):**
- Range: 192.168.1.192/26 to 192.168.1.255/26

**Subnet 4 (25 hosts):**
- Need 25 hosts → 2^5 = 32 addresses
- 32 addresses = /27 (255.255.255.224)
- Range: 192.168.2.0/27 to 192.168.2.31/27

**🔍 Determining Network, Broadcast, and Host Range**

**The Quick Method:**

Given: 192.168.5.130/26

**Step 1: Identify block size**
- /26 = 255.255.255.192
- Block size = 256 - 192 = 64

**Step 2: Find subnet by counting in blocks**
- 0, 64, 128, 192...
- 130 falls in 128 block

**Step 3: Determine addresses**

Network:    192.168.5.128
First host: 192.168.5.129
Last host:  192.168.5.190
Broadcast:  192.168.5.191
Next subnet: 192.168.5.192

**🌍 IPv6 - The Future (and Present)**

**Why IPv6?**
- IPv4 has only 4.3 billion addresses
- Internet is running out of IPv4 addresses
- IPv6 has 340 undecillion addresses!
- That's 340,282,366,920,938,463,463,374,607,431,768,211,456 addresses! 🤯

**IPv6 Structure:**

**128 bits** divided into **8 groups** of **16 bits each** (hexadecimal):

2001:0db8:85a3:0000:0000:8a2e:0370:7334

**IPv6 Shortening Rules:**

**Rule 1: Remove leading zeros**

2001:0db8:85a3:0000:0000:8a2e:0370:7334
becomes
2001:db8:85a3:0:0:8a2e:370:7334

**Rule 2: Replace consecutive zeros with ::**

2001:db8:85a3:0:0:8a2e:370:7334
becomes
2001:db8:85a3::8a2e:370:7334

**Important:** Can only use :: once in an address!

**IPv6 Address Types:**

**Unicast:**
- One-to-one communication
- Similar to IPv4 unicast

**Types of Unicast:**

**Global Unicast (2000::/3):**
- Routable on Internet
- Like public IPv4 addresses
- Begin with 2 or 3

**Link-Local (FE80::/10):**
- Automatic on all interfaces
- Not routable (stays on local link)
- Used for neighbor discovery
- Like APIPA for IPv6

**Unique Local (FC00::/7):**
- Private addresses
- Like RFC 1918 (10.x.x.x, 192.168.x.x)
- Not routable on Internet

**Multicast (FF00::/8):**
- One-to-many communication
- Begins with FF
- No broadcast in IPv6!

**Special IPv6 Addresses:**

**Loopback:**
- ::1 (all zeros except last bit)
- Like 127.0.0.1 in IPv4

**Unspecified:**
- :: (all zeros)
- Like 0.0.0.0 in IPv4

**IPv6 Prefix Length:**

Similar to CIDR notation:
- 2001:db8::/32 means first 32 bits are network
- /64 is most common for LANs
- /128 is single host

**IPv6 Subnetting:**

Much simpler than IPv4!

**Standard /64 subnet:**

2001:0db8:1234:5678::/64

Network portion: 2001:0db8:1234:5678
Host portion:    0000:0000:0000:0000

**Example: Subnetting /48 into /64s**

Given: 2001:db8:1234::/48

Available for subnetting: bits 48-64 (16 bits)
- 2^16 = 65,536 /64 subnets!

**Subnets:**

2001:db8:1234:0000::/64
2001:db8:1234:0001::/64
2001:db8:1234:0002::/64
...
2001:db8:1234:ffff::/64

**IPv6 Address Configuration:**

**SLAAC (Stateless Address Autoconfiguration):**
- Automatically configures IP address
- Uses router advertisements
- No DHCP server needed!

**DHCPv6:**
- Stateful configuration
- Like DHCP for IPv4
- Provides more control

**🔧 Practical Subnetting Scenarios**

**Scenario 1: Office Network Design**

**Requirements:**
- Executive floor: 30 devices
- Marketing floor: 50 devices
- IT floor: 10 devices
- Guest WiFi: 100 devices

**Solution:**
Start with 192.168.1.0/24

1. **Guest WiFi (100 hosts):**
   - 192.168.1.0/25 (126 usable hosts)

2. **Marketing (50 hosts):**
   - 192.168.1.128/26 (62 usable hosts)

3. **Executive (30 hosts):**
   - 192.168.1.192/27 (30 usable hosts)

4. **IT (10 hosts):**
   - 192.168.1.224/28 (14 usable hosts)

**Scenario 2: Point-to-Point Links**

For router-to-router connections:
- Use /30 (4 addresses, 2 usable)
- Or /31 (RFC 3021) for exactly 2 addresses

**Example:**

Link 1: 10.0.0.0/30
  Router A: 10.0.0.1
  Router B: 10.0.0.2

Link 2: 10.0.0.4/30
  Router B: 10.0.0.5
  Router C: 10.0.0.6

**🎓 Subnetting Tricks & Tips**

**The "Magic Number" Method:**

1. Find the interesting octet (where subnet mask isn't 0 or 255)
2. Subtract subnet value from 256 = block size
3. Count by block size to find your subnet

**Example:** 172.16.50.10/22
- Interesting octet: 3rd (255.255.252.0)
- 256 - 252 = 4 (block size)
- Count: 0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, **48**, 52
- 50 is in 48 block
- Subnet: 172.16.48.0/22
- Range: 172.16.48.1 to 172.16.51.254
- Broadcast: 172.16.51.255

**Binary ANDing (The Technical Way):**

To find network address:
1. Convert IP and mask to binary
2. AND them together (1 AND 1 = 1, everything else = 0)

**Example:** 192.168.15.75/27

IP:    11000000.10101000.00001111.01001011
Mask:  11111111.11111111.11111111.11100000
       ------------------------------------
AND:   11000000.10101000.00001111.01000000
       = 192.168.15.64 (network address)

**Common Subnetting Questions:**

**Q: How many subnets?**
A: 2^(borrowed bits)

**Q: How many hosts per subnet?**
A: 2^(host bits) - 2

**Q: What's the broadcast address?**
A: Last IP in subnet

**Q: What's valid host range?**
A: First IP after network to last IP before broadcast

**Study Tips for Day 4:**

1. **Practice, practice, practice!**
   - Do 10 subnetting problems daily
   - Use online subnet calculators to check

2. **Memorize the powers of 2:**
   - 2, 4, 8, 16, 32, 64, 128, 256

3. **Memorize common masks:**
   - /24, /25, /26, /27, /28, /29, /30

4. **Use mnemonic devices:**
   - "Please Do Not Throw Sausage Pizza Away" for OSI
   - Create your own for subnet masks!

5. **Understand, don't just memorize:**
   - Know WHY subnetting works
   - Understand binary fundamentals

6. **Work with IPv6:**
   - It's simpler than you think!
   - Focus on shortening rules

**Key Takeaways:**

✅ IP addresses have network and host portions
✅ Subnet mask determines the division
✅ CIDR notation (/24) is cleaner than decimal
✅ Block size = 256 - subnet mask value
✅ Always subtract 2 for network and broadcast
✅ IPv6 has 128 bits vs IPv4's 32 bits
✅ IPv6 subnetting is usually on /64 boundaries
✅ Private addresses: 10.x.x.x, 172.16-31.x.x, 192.168.x.x
✅ APIPA: 169.254.x.x (DHCP failure indicator)

You've now mastered IP addressing and subnetting! 🎓`,

  // TEXTBOOK CONTENT (Formal Academic Style) - PLACEHOLDER
  lesson_textbook: `**[TEXTBOOK CONTENT PLACEHOLDER]**

This section is reserved for formal academic textbook content covering IPv4/IPv6 Addressing and Subnetting.

**Topics to be covered:**
• Internet Protocol version 4 (IPv4) Architecture
• Binary to Decimal Conversion Methodologies
• IPv4 Address Classes (A, B, C, D, E)
• Subnet Mask Theory and Application
• Classless Inter-Domain Routing (CIDR)
• Subnetting Algorithms and Calculations
• Variable Length Subnet Masking (VLSM)
• Supernetting and Route Aggregation
• IPv6 Addressing Architecture
• IPv6 Address Types and Scopes
• IPv6 Subnetting Principles
• IPv4 to IPv6 Transition Mechanisms
• Private Addressing (RFC 1918)
• Special-Use IPv4 Addresses
• Subnetting Design Best Practices

**Format will include:**
- Formal definitions and terminology
- Mathematical formulas and proofs
- Detailed calculation methods
- RFC references
- Network design principles
- Addressing hierarchies
- Comprehensive examples
- Practice problems with solutions

**Paste your textbook content here, following the formal academic structure seen in Day 1 and Day 2 modules.**`,

  // SUMMARY CONTENT
  lesson_summary: `**Quick Summary: IPv4/IPv6 Addressing & Subnetting**

**IPv4 Basics:**
• 32 bits, 4 octets (8 bits each)
• Each octet: 0-255
• Format: x.x.x.x (e.g., 192.168.1.1)

**IP Classes:**
• Class A: 1-126 (255.0.0.0 or /8)
• Class B: 128-191 (255.255.0.0 or /16)
• Class C: 192-223 (255.255.255.0 or /24)
• Class D: 224-239 (Multicast)
• Class E: 240-255 (Experimental)

**Special Addresses:**
• Loopback: 127.0.0.1
• Private: 10.x, 172.16-31.x, 192.168.x
• APIPA: 169.254.x.x (DHCP failed)
• Broadcast: 255.255.255.255

**Common Subnet Masks:**

/24 = 255.255.255.0    → 254 hosts
/25 = 255.255.255.128  → 126 hosts
/26 = 255.255.255.192  → 62 hosts
/27 = 255.255.255.224  → 30 hosts
/28 = 255.255.255.240  → 14 hosts
/29 = 255.255.255.248  → 6 hosts
/30 = 255.255.255.252  → 2 hosts (point-to-point)

**Subnetting Formulas:**
• Subnets: 2^n (n = borrowed bits)
• Hosts: 2^h - 2 (h = host bits)
• Block size: 256 - subnet mask

**Subnetting Steps:**
1. Determine bits to borrow
2. Calculate new mask
3. Find block size (256 - mask)
4. Count by blocks to find range
5. Network, First Host, Last Host, Broadcast

**Powers of 2 (Memorize!):**

2^1=2, 2^2=4, 2^3=8, 2^4=16
2^5=32, 2^6=64, 2^7=128, 2^8=256

**IPv6 Basics:**
• 128 bits, 8 groups of 16 bits
• Hexadecimal format
• Example: 2001:db8::1

**IPv6 Shortening:**
1. Remove leading zeros
2. Replace consecutive zeros with :: (once only)

**IPv6 Address Types:**
• Global Unicast: 2000::/3 (public)
• Link-Local: FE80::/10 (local only)
• Unique Local: FC00::/7 (private)
• Multicast: FF00::/8 (one-to-many)
• Loopback: ::1

**IPv6 Common Prefixes:**
• /64 - Standard LAN subnet
• /48 - Site allocation
• /32 - ISP allocation
• /128 - Single host

**Quick Subnet Example:**
192.168.1.0/26
• Mask: 255.255.255.192
• Block: 256-192=64
• Subnets: 0, 64, 128, 192
• Hosts per subnet: 64-2=62

**VLSM Strategy:**
1. Start with largest subnet
2. Allocate addresses
3. Move to next largest
4. No wasted space!`,

  // QUIZ QUESTIONS
  quiz_questions: [
    {
      question: "What is the default subnet mask for a Class B network?",
      options: ["255.0.0.0", "255.255.0.0", "255.255.255.0", "255.255.255.255"],
      correct_answer: "255.255.0.0"
    },
    {
      question: "How many usable host addresses are in a /26 network?",
      options: ["32", "62", "64", "128"],
      correct_answer: "62"
    },
    {
      question: "Which address range is reserved for private networks (RFC 1918)?",
      options: ["127.0.0.0/8", "169.254.0.0/16", "192.168.0.0/16", "224.0.0.0/4"],
      correct_answer: "192.168.0.0/16"
    },
    {
      question: "What does an IP address of 169.254.x.x indicate?",
      options: ["Valid DHCP assignment", "APIPA - DHCP failed", "Private address", "Loopback address"],
      correct_answer: "APIPA - DHCP failed"
    },
    {
      question: "What is the IPv6 loopback address?",
      options: ["::1", "127.0.0.1", "FE80::1", "FF00::1"],
      correct_answer: "::1"
    },
    {
      question: "What is the CIDR notation for subnet mask 255.255.255.192?",
      options: ["/24", "/25", "/26", "/27"],
      correct_answer: "/26"
    },
    {
      question: "How many bits are in an IPv6 address?",
      options: ["32", "64", "128", "256"],
      correct_answer: "128"
    },
    {
      question: "What is the broadcast address for network 192.168.1.0/24?",
      options: ["192.168.1.0", "192.168.1.1", "192.168.1.254", "192.168.1.255"],
      correct_answer: "192.168.1.255"
    },
    {
      question: "Which IPv6 address type begins with FE80?",
      options: ["Global Unicast", "Link-Local", "Multicast", "Unique Local"],
      correct_answer: "Link-Local"
    },
    {
      question: "How many subnets can you create by borrowing 3 bits?",
      options: ["2", "4", "6", "8"],
      correct_answer: "8"
    },
    {
      question: "What is the first usable host address in the 192.168.1.64/26 subnet?",
      options: ["192.168.1.64", "192.168.1.65", "192.168.1.126", "192.168.1.127"],
      correct_answer: "192.168.1.65"
    },
    {
      question: "Which of the following is a valid IPv6 address?",
      options: ["192.168.1.1", "2001:db8::1", "255.255.255.0", "FE80::/64"],
      correct_answer: "2001:db8::1"
    },
    {
      question: "What is the block size for a /28 subnet?",
      options: ["8", "16", "32", "64"],
      correct_answer: "16"
    },
    {
      question: "What does VLSM stand for?",
      options: ["Very Large Subnet Mask", "Variable Length Subnet Masking", "Virtual LAN Subnet Method", "Variable Link Subnet Mode"],
      correct_answer: "Variable Length Subnet Masking"
    },
    {
      question: "Which IP address is the loopback address?",
      options: ["0.0.0.0", "127.0.0.1", "255.255.255.255", "169.254.1.1"],
      correct_answer: "127.0.0.1"
    }
  ],

  // FLASHCARDS
  flashcards: [
    { term: "IPv4", definition: "32-bit address, 4 octets, x.x.x.x format" },
    { term: "IPv6", definition: "128-bit address, 8 groups of 16 bits, hex format" },
    { term: "Class A", definition: "1-126, /8 default, 16.7M hosts per network" },
    { term: "Class B", definition: "128-191, /16 default, 65K hosts per network" },
    { term: "Class C", definition: "192-223, /24 default, 254 hosts per network" },
    { term: "Loopback", definition: "127.0.0.1 - ping yourself, tests TCP/IP stack" },
    { term: "Private 10.x.x.x", definition: "Class A private, /8, 16.7M addresses" },
    { term: "Private 172.16-31.x.x", definition: "Class B private, /12, 1M addresses" },
    { term: "Private 192.168.x.x", definition: "Class C private, /16, 65K addresses" },
    { term: "APIPA 169.254.x.x", definition: "Auto-assigned when DHCP fails" },
    { term: "/24 Subnet", definition: "255.255.255.0 - 254 usable hosts" },
    { term: "/26 Subnet", definition: "255.255.255.192 - 62 usable hosts" },
    { term: "/30 Subnet", definition: "255.255.255.252 - 2 usable hosts (P2P links)" },
    { term: "Subnet Formula", definition: "Subnets: 2^n, Hosts: 2^h - 2" },
    { term: "Block Size", definition: "256 - subnet mask value in interesting octet" },
    { term: "VLSM", definition: "Variable Length Subnet Masking - different sized subnets" },
    { term: "CIDR", definition: "Classless Inter-Domain Routing - /24 notation" },
    { term: "IPv6 Global Unicast", definition: "2000::/3 - routable on Internet" },
    { term: "IPv6 Link-Local", definition: "FE80::/10 - local link only, auto-configured" },
    { term: "IPv6 Loopback", definition: "::1 - equivalent to 127.0.0.1" },
    { term: "IPv6 /64", definition: "Standard LAN subnet size" },
    { term: "Network Address", definition: "First IP in subnet, identifies network" },
    { term: "Broadcast Address", definition: "Last IP in subnet, sends to all hosts" },
    { term: "Usable Host Range", definition: "Network+1 to Broadcast-1" },
    { term: "Subnet Mask", definition: "Defines network vs host portions" },
    { term: "255.255.255.255", definition: "Limited broadcast, stays on local network" }
  ],

  gameType: 'subnet-speedster',

  hands_on_exercise: `Subnetting Practice Lab:

**Exercise 1: Basic Subnetting**
Subnet 192.168.10.0/24 into 8 equal subnets
- How many bits to borrow?
- What's the new subnet mask?
- What's the block size?
- List all 8 subnet ranges with network, first host, last host, and broadcast

**Exercise 2: VLSM Design**
You have network 172.16.0.0/16 and need:
- 1 subnet for 4000 hosts
- 2 subnets for 1000 hosts each
- 4 subnets for 500 hosts each
- 8 subnets for 100 hosts each

Design the addressing scheme using VLSM.

**Exercise 3: Subnet Identification**
Given IP: 10.5.67.148/21
- What is the network address?
- What is the broadcast address?
- What is the valid host range?
- How many usable hosts in this subnet?

**Exercise 4: IPv6 Shortening**
Shorten these IPv6 addresses:
1. 2001:0db8:0000:0000:0000:ff00:0042:8329
2. fe80:0000:0000:0000:0202:b3ff:fe1e:8329
3. 2001:0db8:0001:0000:0000:0000:0000:0001

**Exercise 5: Real-World Scenario**
Design a network for a company with:
- HQ: 500 devices
- Branch 1: 100 devices
- Branch 2: 50 devices
- Branch 3: 25 devices
- 3 point-to-point WAN links

Start with 10.0.0.0/8 and create an efficient VLSM design.

**Verification:**
Use online subnet calculators to verify your answers!
- www.subnet-calculator.com
- www.ipcalc.com`
};

export default day4Module;
