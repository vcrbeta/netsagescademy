// CompTIA Network+ Module Content
// Week 1: Networking Foundations & IP Addressing

export const modules = [
  // DAY 1: Intro & Networking Models - EXPANDED VERSION
  {
    day: 1,
    module_title: "Intro & Networking Models",
    
    lesson_content: `**Welcome to Networking Foundations!**

Today we're diving into the essential building blocks of computer networking. Understanding the OSI and TCP/IP models is crucial for troubleshooting, designing networks, and passing the Network+ exam.

**What is a Computer Network?**
A computer network is a collection of interconnected devices that can communicate and share resources. Networks enable:
- File and resource sharing (printers, storage)
- Communication (email, messaging, video calls)
- Centralized data management
- Internet connectivity

**Network Types:**
• LAN (Local Area Network): Covers a small area like a building or campus. High speed, low latency.
• WAN (Wide Area Network): Spans cities, countries, or globally. Uses leased lines, internet connections.
• MAN (Metropolitan Area Network): Covers a city or large campus.
• PAN (Personal Area Network): Bluetooth devices, very short range.

**The OSI Model (Open Systems Interconnection)**
The OSI model is a conceptual framework with 7 layers that standardizes how network protocols interact. Think of it as a blueprint for network communication.

**Layer 7 - Application Layer:**
- Closest to the end user
- Provides network services directly to applications
- Protocols: HTTP, HTTPS, FTP, SMTP, DNS, DHCP, Telnet, SSH
- Example: Your web browser uses HTTP/HTTPS at this layer

**Layer 6 - Presentation Layer:**
- Translates data between application and network formats
- Handles encryption/decryption (SSL/TLS)
- Data compression and decompression
- Format conversion (ASCII, JPEG, MPEG, GIF)
- Example: When you visit an HTTPS site, encryption happens here

**Layer 5 - Session Layer:**
- Establishes, manages, and terminates sessions between applications
- Handles authentication and reconnection after interruptions
- Maintains dialog control (who can transmit when)
- Example: When you log into a website, session management occurs here

**Layer 4 - Transport Layer:**
- Provides end-to-end communication services
- Two main protocols: TCP and UDP
- Handles segmentation of data
- Flow control and error checking
- Port numbers (0-65535) identify specific applications
- Example: TCP ensures your email arrives complete and in order

**TCP vs UDP:**
• TCP (Transmission Control Protocol):
  - Connection-oriented (establishes connection first)
  - Reliable delivery (acknowledges receipt, retransmits if needed)
  - Ordered delivery (packets arrive in sequence)
  - Slower but guaranteed
  - Used for: Web browsing, email, file transfers
  - Three-way handshake: SYN → SYN-ACK → ACK

• UDP (User Datagram Protocol):
  - Connectionless (just sends data)
  - Unreliable (no acknowledgment)
  - Unordered (packets may arrive out of sequence)
  - Faster but not guaranteed
  - Used for: Streaming video, VoIP, online gaming, DNS queries

**Layer 3 - Network Layer:**
- Handles logical addressing (IP addresses)
- Routing between networks
- Packet forwarding through routers
- Path determination (best route selection)
- Protocols: IP, ICMP, IGMP, routing protocols (RIP, OSPF, BGP)
- Example: Routers operate at this layer to forward packets between networks

**Layer 2 - Data Link Layer:**
- Provides reliable node-to-node data transfer
- Physical addressing using MAC addresses
- Frame creation and error detection
- Two sublayers:
  • LLC (Logical Link Control): Flow and error control
  • MAC (Media Access Control): Physical addressing
- Protocols: Ethernet, Wi-Fi (802.11), PPP, Switches
- Error detection: CRC (Cyclic Redundancy Check)
- Example: Switches use MAC addresses at this layer

**Layer 1 - Physical Layer:**
- Transmits raw bits over physical media
- Defines electrical and physical specifications
- Cable types: Coaxial, twisted pair (Cat5e, Cat6), fiber optic
- Wireless: Radio waves, infrared
- Connectors: RJ-45, SC, LC, ST
- Signaling methods and voltage levels
- Example: Ethernet cables, fiber optic links, Wi-Fi radio signals

**Encapsulation Process:**
As data moves DOWN the OSI stack (from Application to Physical), each layer adds its own header (and sometimes trailer):

Data (L7-L5) → Segment (L4) → Packet (L3) → Frame (L2) → Bits (L1)

**Example:** Sending an email:
1. Application Layer: Email application creates the message
2. Presentation Layer: Encrypts the message if using SSL/TLS
3. Session Layer: Establishes session with mail server
4. Transport Layer: TCP breaks message into segments, adds port numbers
5. Network Layer: Adds IP addresses (source and destination)
6. Data Link Layer: Adds MAC addresses, creates frame with error checking
7. Physical Layer: Converts frame to electrical signals on the wire

**The TCP/IP Model**
A simplified 4-layer model used in real-world networking:

**Application Layer** (combines OSI Layers 5-7):
- HTTP, HTTPS, FTP, SMTP, DNS, DHCP, SSH, Telnet
- All user-facing protocols

**Transport Layer** (same as OSI Layer 4):
- TCP and UDP
- Port numbers and segmentation

**Internet Layer** (same as OSI Layer 3):
- IP addressing and routing
- ICMP, IGMP

**Link Layer** (combines OSI Layers 1-2):
- Ethernet, Wi-Fi
- Physical transmission and MAC addressing

**Why Two Models?**
- OSI: Theoretical model for understanding layers
- TCP/IP: Practical model actually used on the internet
- Network+ exam requires knowledge of BOTH

**Key Concepts to Remember:**
1. OSI has 7 layers, TCP/IP has 4 layers
2. Data moves DOWN layers when sending (encapsulation)
3. Data moves UP layers when receiving (de-encapsulation)
4. Each layer adds its own header information
5. TCP is reliable but slower; UDP is fast but unreliable
6. Switches work at Layer 2; Routers work at Layer 3

**Common Ports You Must Know:**
• HTTP: 80 (web traffic)
• HTTPS: 443 (secure web traffic)
• FTP: 20 (data), 21 (control)
• SSH: 22 (secure remote access)
• Telnet: 23 (insecure remote access)
• SMTP: 25 (sending email)
• DNS: 53 (domain name resolution)
• DHCP: 67 (server), 68 (client)
• TFTP: 69 (trivial file transfer)
• POP3: 110 (receiving email)
• IMAP: 143 (receiving email with server sync)
• RDP: 3389 (Remote Desktop Protocol)

**Troubleshooting with Layers:**
When troubleshooting network issues, work from Layer 1 upward:
1. Physical: Check cables, lights, power
2. Data Link: Verify switch connectivity, MAC addresses
3. Network: Check IP configuration, ping gateway
4. Transport: Verify correct ports are open
5. Session/Presentation/Application: Check application settings

**Real-World Example:**
You can't access a website (www.example.com):

Layer 1: Is the cable plugged in? Are lights blinking on NIC?
Layer 2: Is the switch working? Can you see MAC address in ARP table?
Layer 3: Do you have a valid IP address? Can you ping the default gateway?
Layer 4: Is port 80/443 blocked by a firewall?
Layer 7: Is the web browser configured correctly? Is DNS resolving the domain?

**Study Tips:**
- Memorize OSI layers in order (mnemonic: "Please Do Not Throw Sausage Pizza Away")
- Practice identifying which layer protocols operate at
- Understand the difference between TCP and UDP
- Know common port numbers by heart
- Draw the OSI model from memory daily`,

    lesson_summary: `**Quick Summary: Networking Models**

**What is a Network?**
A network is interconnected devices that communicate and share resources. Types: LAN (local), WAN (wide area), MAN (metro), PAN (personal).

**OSI Model (7 Layers):**
7. Application - User-facing protocols (HTTP, FTP, SMTP, DNS)
6. Presentation - Encryption, compression, format conversion
5. Session - Establishes and manages connections
4. Transport - TCP (reliable) vs UDP (fast), uses port numbers
3. Network - IP addressing and routing
2. Data Link - MAC addresses, switches, frames, error detection
1. Physical - Cables, signals, bits, physical transmission

**Mnemonic:** Please Do Not Throw Sausage Pizza Away

**TCP/IP Model (4 Layers):**
1. Application (OSI 5-7) - All user protocols
2. Transport (OSI 4) - TCP/UDP
3. Internet (OSI 3) - IP addressing
4. Link (OSI 1-2) - Physical + Data Link

**TCP vs UDP:**
• TCP: Reliable, connection-oriented, slower (email, web, file transfer)
• UDP: Fast, connectionless, no guarantee (streaming, gaming, VoIP)

**Encapsulation:**
Data → Segment → Packet → Frame → Bits

**Key Ports:**
HTTP (80), HTTPS (443), FTP (20/21), SSH (22), DNS (53), SMTP (25), POP3 (110), IMAP (143), RDP (3389)

**Troubleshooting:**
Start at Layer 1 (physical) and work up. Check cables, IP config, ping gateway, then application settings.

**Must Remember:**
- OSI = 7 layers, TCP/IP = 4 layers
- Switches = Layer 2, Routers = Layer 3
- TCP = reliable, UDP = fast
- Each layer adds a header during encapsulation`,

    quiz_questions: [
      {
        question: "Which OSI layer is responsible for routing packets across networks?",
        options: ["Physical", "Network", "Transport", "Application"],
        correct_answer: "Network"
      },
      {
        question: "What does TCP/IP stand for?",
        options: ["Transmission Control Protocol/Internet Protocol", "Transfer Communication Protocol/Internet Packet", "Transmission Control Process/Internet Port", "Transport Control Protocol/Internal Protocol"],
        correct_answer: "Transmission Control Protocol/Internet Protocol"
      },
      {
        question: "Which layer of the OSI model provides end-to-end communication?",
        options: ["Session", "Transport", "Data Link", "Physical"],
        correct_answer: "Transport"
      },
      {
        question: "Which type of network typically covers a small geographical area?",
        options: ["WAN", "LAN", "MAN", "PAN"],
        correct_answer: "LAN"
      },
      {
        question: "What is the main purpose of the Physical layer?",
        options: ["Routing packets", "Transmitting raw bits over a medium", "Providing user interfaces", "Error checking at the transport level"],
        correct_answer: "Transmitting raw bits over a medium"
      },
      {
        question: "Which OSI layer establishes, manages, and terminates sessions?",
        options: ["Session", "Presentation", "Transport", "Network"],
        correct_answer: "Session"
      },
      {
        question: "TCP operates at which OSI layer?",
        options: ["Application", "Transport", "Network", "Data Link"],
        correct_answer: "Transport"
      },
      {
        question: "Which layer is responsible for data encryption and compression?",
        options: ["Presentation", "Network", "Physical", "Session"],
        correct_answer: "Presentation"
      },
      {
        question: "What is the main difference between TCP and UDP?",
        options: ["TCP is faster than UDP", "UDP is reliable; TCP is unreliable", "TCP is connection-oriented and reliable; UDP is connectionless and faster", "There is no difference"],
        correct_answer: "TCP is connection-oriented and reliable; UDP is connectionless and faster"
      },
      {
        question: "At which layer do switches operate?",
        options: ["Layer 1", "Layer 2", "Layer 3", "Layer 4"],
        correct_answer: "Layer 2"
      },
      {
        question: "What is encapsulation in networking?",
        options: ["Converting analog to digital", "Adding headers at each layer as data moves down the OSI stack", "Compressing data", "Encrypting information"],
        correct_answer: "Adding headers at each layer as data moves down the OSI stack"
      },
      {
        question: "Which protocol is used for secure remote access?",
        options: ["Telnet", "SSH", "FTP", "HTTP"],
        correct_answer: "SSH"
      },
      {
        question: "What port does HTTPS use?",
        options: ["80", "443", "22", "25"],
        correct_answer: "443"
      },
      {
        question: "Which OSI layer uses MAC addresses?",
        options: ["Physical", "Data Link", "Network", "Transport"],
        correct_answer: "Data Link"
      },
      {
        question: "How many layers does the TCP/IP model have?",
        options: ["3", "4", "5", "7"],
        correct_answer: "4"
      }
    ],

    flashcards: [
      { term: "OSI Model", definition: "7-layer conceptual framework: Physical, Data Link, Network, Transport, Session, Presentation, Application" },
      { term: "TCP/IP Model", definition: "4-layer practical model: Link, Internet, Transport, Application" },
      { term: "Layer 1 - Physical", definition: "Transmits raw bits over physical media (cables, signals, connectors)" },
      { term: "Layer 2 - Data Link", definition: "MAC addresses, switches, frames, error detection with CRC" },
      { term: "Layer 3 - Network", definition: "IP addressing, routing, routers, packet forwarding" },
      { term: "Layer 4 - Transport", definition: "TCP (reliable) and UDP (fast), port numbers, segmentation" },
      { term: "TCP", definition: "Connection-oriented, reliable, ordered delivery. Used for web, email, file transfer." },
      { term: "UDP", definition: "Connectionless, fast, no guarantee. Used for streaming, gaming, VoIP, DNS." },
      { term: "Encapsulation", definition: "Adding headers at each layer: Data → Segment → Packet → Frame → Bits" },
      { term: "Port 80", definition: "HTTP - unencrypted web traffic" },
      { term: "Port 443", definition: "HTTPS - encrypted web traffic using SSL/TLS" },
      { term: "Port 22", definition: "SSH - Secure Shell for encrypted remote access" },
      { term: "Port 53", definition: "DNS - Domain Name System for resolving names to IPs" },
      { term: "LAN", definition: "Local Area Network - small geographic area, high speed" },
      { term: "WAN", definition: "Wide Area Network - spans cities/countries, uses leased lines" },
      { term: "Three-way Handshake", definition: "TCP connection: SYN → SYN-ACK → ACK" },
      { term: "MAC Address", definition: "48-bit physical address at Layer 2 (Data Link)" },
      { term: "Mnemonic", definition: "OSI Layers: Please Do Not Throw Sausage Pizza Away" }
    ],

    gameType: 'osi-matching', // Identifier for which game to show

    hands_on_exercise: "Draw the complete OSI model from memory with all 7 layers. For each layer, write: 1) The layer name, 2) One key function, 3) One example protocol or device. Then trace how an HTTPS request travels through all layers from your browser to a web server."
  }

  // Days 2-7 coming soon!
];

export default modules;