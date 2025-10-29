// DAY 1: Intro & Networking Models - COMPLETE MODULE

export const day1Module = {
  day: 1,
  module_title: "Intro & Networking Models",
  
  // CONVERSATIONAL CONTENT (Full Mode)
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

  // TEXTBOOK CONTENT (Formal Academic Style)
  lesson_textbook: `**Chapter 1: Introduction to Internetworking Models**

**Objectives**
Upon completion of this chapter, you will be able to:
• Explain the purpose and benefits of the OSI reference model
• Identify the seven layers of the OSI model and their functions
• Describe the TCP/IP model and its relationship to the OSI model
• Understand data encapsulation and the communication process
• Differentiate between connection-oriented and connectionless protocols

**1.1 Internetworking Models**

In the early days of computer networking, systems from different manufacturers were incompatible. A company running DECnet could not communicate with IBM systems. In the late 1970s, the International Organization for Standardization (ISO) created the Open Systems Interconnection (OSI) reference model to address this fundamental limitation.

The OSI model serves as an architectural framework for network communications. It describes how data and network information are communicated from an application on one computer through network media to an application on another computer. The model divides this complex process into discrete, manageable layers.

**1.2 The Layered Approach**

A reference model is a conceptual blueprint that defines how communications should occur. It identifies all processes required for effective communication and organizes these processes into logical groupings called layers. This architectural approach is known as layered architecture.

Consider an analogy: When establishing a business, you identify required tasks, assign responsibilities, determine workflow sequences, and group related tasks into departments. Each department has specific duties and relies on other departments to perform their functions competently. This organizational structure parallels how network communications are organized in the OSI model.

Software developers use reference models to understand computer communication processes and see precisely what must be accomplished at each layer. When developing a protocol for a specific layer, developers need only focus on that layer's functions, trusting that different protocols will handle the requirements of other layers. This concept is called binding—the grouping of related communication processes at a particular layer.

**1.3 Advantages of Reference Models**

The OSI model provides several critical advantages for network design and implementation:

**Simplified Component Development:** By dividing network communication into smaller, simpler components, the OSI model facilitates the development, design, and troubleshooting of network systems.

**Multi-Vendor Compatibility:** Standardization of network components enables different vendors to develop compatible products that can interoperate seamlessly.

**Industry Standardization:** The model encourages standardization by clearly defining the specific functions that occur at each layer.

**Hardware and Software Diversity:** Various types of network hardware and software can communicate effectively through adherence to standardized protocols.

**Change Isolation:** Modifications to one layer do not affect other layers, facilitating development and simplifying application programming.

The OSI model enables data transfer between disparate host systems regardless of their operating systems (UNIX/Linux, Windows, macOS). However, it is important to understand that the OSI model is not a physical model but rather a conceptual framework—a comprehensive yet flexible set of guidelines that application developers utilize to create and implement network applications.

**1.4 The Seven Layers of the OSI Model**

The OSI model consists of seven hierarchical layers:

**Layer 7 - Application**
**Layer 6 - Presentation**
**Layer 5 - Session**
**Layer 4 - Transport**
**Layer 3 - Network**
**Layer 2 - Data Link**
**Layer 1 - Physical**

These seven layers are divided into two functional groups:

**Upper Layers (7, 6, 5):** Define how applications within host machines communicate with each other and with end users. These layers have no knowledge of networking or network addresses.

**Lower Layers (4, 3, 2, 1):** Define how data is transmitted end-to-end, including physical transmission through media, switches, and routers. These layers handle network addressing and routing.

**1.5 Application Layer (Layer 7)**

The Application layer represents the interface between network applications and the OSI model. Users interact with computers through application processes, interfaces, or Application Programming Interfaces (APIs) that connect applications to the operating system.

**Key Functions:**
• Identifies and establishes availability of communication partners
• Determines resource availability for communications
• Synchronizes communication between applications
• Establishes procedures for error recovery and data integrity control

**Important Note:** Applications themselves do not reside within the Application layer. Rather, they interface with Application layer protocols when accessing network resources. For example, a web browser does not reside at the Application layer but interfaces with Application layer protocols (HTTP, HTTPS) when retrieving remote resources.

**Common Application Layer Protocols:**
• HTTP/HTTPS: Web communications
• FTP/SFTP: File transfer
• SMTP: Email transmission
• DNS: Domain name resolution
• DHCP: Dynamic IP address assignment

**1.6 Presentation Layer (Layer 6)**

The Presentation layer ensures that data sent from the Application layer of one system can be read by the Application layer of another system. It provides translation services for data format standardization.

**Primary Functions:**
• **Data Translation:** Converts between different data representation formats (e.g., EBCDIC to ASCII, Unicode to ASCII)
• **Data Compression:** Reduces the number of bits for transmission efficiency
• **Data Encryption:** Provides security through cryptographic transformation
• **Data Decompression:** Restores compressed data to original format
• **Data Decryption:** Reverses encryption to restore readable data

**1.7 Session Layer (Layer 5)**

The Session layer manages communication sessions between Presentation layer entities. It provides dialog control and synchronization services.

**Core Responsibilities:**
• **Session Establishment:** Sets up connections between applications
• **Session Management:** Maintains ongoing communications
• **Session Termination:** Properly closes connections
• **Dialog Control:** Manages communication flow between devices

**Communication Modes:**
• **Simplex:** One-way communication only
• **Half-Duplex:** Two-way communication, but only one direction at a time
• **Full-Duplex:** Simultaneous two-way communication

**1.8 Transport Layer (Layer 4)**

The Transport layer provides end-to-end data transport services and establishes logical connections between the sending and destination hosts. This layer is critical for reliable network communications.

**Key Functions:**
• Segments data from upper-layer applications
• Establishes end-to-end connectivity
• Provides flow control mechanisms
• Ensures reliable delivery through acknowledgments
• Implements error detection and correction
• Manages multiplexing of upper-layer applications

**Transport Layer Protocols:**

**Transmission Control Protocol (TCP) - Connection-Oriented:**
TCP provides reliable, connection-oriented communication through:
• Three-way handshake for connection establishment
• Acknowledgment of received data
• Sequencing for proper data ordering
• Flow control to prevent buffer overflow
• Error detection and retransmission

**User Datagram Protocol (UDP) - Connectionless:**
UDP provides fast, connectionless communication characterized by:
• No connection establishment overhead
• No acknowledgment of receipt
• No guaranteed delivery
• No sequencing
• Minimal protocol overhead
• Suitable for time-sensitive applications

**Connection-Oriented Communication Process:**

Before data transmission begins, TCP establishes a virtual circuit through a three-way handshake:

**Step 1 - SYN (Synchronize):** The sender transmits a synchronization request to the receiver.

**Step 2 - SYN-ACK (Synchronize-Acknowledgment):** The receiver acknowledges the request and sends its own synchronization request, establishing bidirectional communication parameters.

**Step 3 - ACK (Acknowledgment):** The sender acknowledges the receiver's synchronization, completing connection establishment. Data transfer can now commence.

**Flow Control:**

Flow control prevents a sending host from overwhelming a receiving host's buffers. The Transport layer implements flow control through:

• **Window Size Management:** Defining the amount of data that can be sent before requiring acknowledgment
• **Buffer Management:** Monitoring receiver buffer capacity
• **Congestion Notification:** Sending "stop" or "not ready" indicators when buffers near capacity
• **Transmission Resumption:** Sending "ready" or "go" indicators when capacity is available

**Windowing:**

Windowing optimizes data throughput by allowing transmission of multiple segments before requiring acknowledgment. The window size specifies the number of bytes that can be transmitted without acknowledgment.

**Example:** With a window size of 3, the sender can transmit three data segments before waiting for acknowledgment. This reduces idle time and increases network efficiency.

**Acknowledgments:**

Reliable delivery uses positive acknowledgment with retransmission. The sender maintains a record of transmitted segments and sets a timer for each transmission. If acknowledgment is not received before the timer expires, the segment is retransmitted.

**1.9 Network Layer (Layer 3)**

The Network layer provides logical addressing and routing services. It determines the best path for data to travel from source to destination across internetworks.

**Primary Responsibilities:**
• Logical device addressing (IP addresses)
• Path determination and selection
• Packet forwarding between networks
• Routing table maintenance
• Fragmentation and reassembly of packets

**Routing:**

Routers operate at the Network layer, examining destination IP addresses and consulting routing tables to determine the appropriate exit interface for each packet. If no route exists in the routing table, the router discards the packet.

**Packet Types:**

**Data Packets:** Transport user data through the internetwork using routed protocols (IP, IPv6)

**Route-Update Packets:** Communicate routing information between routers using routing protocols (RIP, OSPF, EIGRP, BGP)

**Routing Table Components:**
• **Network Addresses:** Destination networks and their address ranges
• **Exit Interfaces:** Physical interfaces for forwarding packets
• **Metrics:** Distance calculations for path selection (hop count, bandwidth, delay)
• **Next-Hop Information:** Address of the next router in the path

**Router Characteristics:**
• Break up broadcast domains by default
• Break up collision domains
• Provide internetwork connectivity
• Use access control lists for security
• Support Quality of Service (QoS) mechanisms
• Enable VLAN connectivity

**1.10 Data Link Layer (Layer 2)**

The Data Link layer provides physical transmission services and handles error notification, network topology, and flow control. It ensures reliable transfer of data across the physical link.

**Core Functions:**
• Physical addressing using MAC addresses
• Frame formatting and delimiting
• Error detection (not correction)
• Network topology definition
• Flow control
• Media access control

**IEEE 802 Standards:**

The Data Link layer is specified by IEEE 802 standards, which define protocols for local area and metropolitan area networks:

**802.2 - Logical Link Control (LLC):**
• Identifies Network layer protocols
• Provides multiplexing services
• Implements flow control and error checking
• Manages frame sequencing

**802.3 - Media Access Control (MAC) - Ethernet:**
• Defines CSMA/CD protocol
• Specifies physical addressing (MAC addresses)
• Determines media access methods
• Defines frame format

**Data Link Sublayers:**

The Data Link layer contains two sublayers:

**LLC Sublayer (Upper):**
• Protocol multiplexing
• Flow control
• Error notification
• Communicates with Network layer

**MAC Sublayer (Lower):**
• Physical addressing
• Media access methods
• Logical topology definition
• Communicates with Physical layer

**Frame Structure:**

Frames encapsulate Network layer packets with:
• **Destination MAC Address:** Hardware address of receiving device
• **Source MAC Address:** Hardware address of sending device
• **Type/Length Field:** Protocol identifier or frame size
• **Data Field:** Encapsulated packet from Network layer
• **Frame Check Sequence (FCS):** Error detection code

**1.11 Physical Layer (Layer 1)**

The Physical layer handles the physical connection between devices and the transmission of raw binary data (bits) over the communication medium.

**Primary Functions:**
• Bit encoding and transmission
• Signal generation and detection
• Physical medium specifications
• Connector and pin assignment standards
• Voltage level definitions
• Data rate specifications

**Physical Medium Types:**
• **Copper Cable:** Twisted pair (Cat5e, Cat6, Cat6a)
• **Fiber Optic:** Single-mode and multi-mode fiber
• **Wireless:** Radio frequencies, infrared, microwave

**Physical Topologies:**
• **Bus:** All devices connected to single cable
• **Star:** All devices connected to central hub/switch
• **Ring:** Devices connected in circular configuration
• **Mesh:** Multiple interconnections between devices

**Data Terminal Equipment (DTE) and Data Communication Equipment (DCE):**
• **DTE:** End user equipment (computers, terminals)
• **DCE:** Communication equipment (modems, CSU/DSU)

**1.12 Data Encapsulation**

Data encapsulation is the process of wrapping data with protocol information at each layer as it traverses the OSI stack.

**Encapsulation Process (Top to Bottom):**

**Step 1 - Application Layer:** User data is created
**Step 2 - Transport Layer:** Data is segmented; transport header is added (creating segments)
**Step 3 - Network Layer:** Network header with logical addresses is added (creating packets)
**Step 4 - Data Link Layer:** Data Link header and trailer are added (creating frames)
**Step 5 - Physical Layer:** Frames are converted to bits for transmission

Each layer's Protocol Data Unit (PDU) has a specific name:
• Layer 4: Segment
• Layer 3: Packet
• Layer 2: Frame
• Layer 1: Bits

**De-encapsulation Process (Bottom to Top):**

At the receiving end, the process reverses:
• Physical layer receives bits and passes frames to Data Link layer
• Data Link layer strips frame header/trailer and passes packet to Network layer
• Network layer removes packet header and passes segment to Transport layer
• Transport layer reassembles segments and passes data to Application layer

**1.13 TCP/IP Model**

The TCP/IP model is a practical, implementation-focused model consisting of four layers:

**Application Layer:** Combines OSI layers 7, 6, and 5. Includes protocols such as HTTP, FTP, SMTP, DNS.

**Transport Layer:** Equivalent to OSI layer 4. Implements TCP and UDP protocols.

**Internet Layer:** Equivalent to OSI layer 3. Handles IP addressing and routing.

**Network Access Layer:** Combines OSI layers 2 and 1. Manages physical network connectivity.

**Relationship Between OSI and TCP/IP Models:**

The OSI model provides a theoretical framework for understanding networking, while the TCP/IP model represents the practical implementation used on the Internet. Network professionals must understand both models, as the OSI model facilitates troubleshooting and design discussions, while TCP/IP represents actual protocol implementations.

**Summary**

The OSI reference model provides a standardized framework for network communications through seven hierarchical layers. Each layer performs specific functions and communicates with its peer layer on remote systems. The upper three layers (Application, Presentation, Session) handle application-level communications, while the lower four layers (Transport, Network, Data Link, Physical) manage data transmission across the physical network.

The TCP/IP model offers a simplified four-layer approach that represents practical Internet protocol implementation. Understanding both models is essential for network design, implementation, troubleshooting, and certification success.

Data encapsulation describes how information is wrapped with protocol headers as it descends through the layers, with each layer adding its specific control information. This process reverses at the receiving end through de-encapsulation.

Mastery of these fundamental concepts provides the foundation for understanding more advanced networking topics, including routing protocols, network security, and modern networking technologies.

**Key Terms**

• **OSI Model:** Open Systems Interconnection reference model with seven layers
• **Encapsulation:** Process of wrapping data with protocol information at each layer
• **PDU (Protocol Data Unit):** Data unit at each layer with specific name
• **TCP (Transmission Control Protocol):** Reliable, connection-oriented Transport layer protocol
• **UDP (User Datagram Protocol):** Fast, connectionless Transport layer protocol
• **Three-Way Handshake:** TCP connection establishment process (SYN, SYN-ACK, ACK)
• **Flow Control:** Mechanism to prevent buffer overflow at receiving end
• **Windowing:** Technique allowing multiple segment transmission before acknowledgment
• **Router:** Layer 3 device that forwards packets between networks
• **Switch:** Layer 2 device that forwards frames based on MAC addresses
• **MAC Address:** Physical address assigned to network interface hardware
• **IP Address:** Logical address assigned to network devices for routing`,

  // SUMMARY CONTENT
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

  gameType: 'osi-matching',

  hands_on_exercise: "Draw the complete OSI model from memory with all 7 layers. For each layer, write: 1) The layer name, 2) One key function, 3) One example protocol or device. Then trace how an HTTPS request travels through all layers from your browser to a web server."
};

export default day1Module;