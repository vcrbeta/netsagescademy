// DAY 2: TCP/IP Protocols & Port Numbers - COMPLETE MODULE

export const day2Module = {
  day: 2,
  module_title: "TCP/IP Protocols & Port Numbers",
  
  // CONVERSATIONAL CONTENT (Full Mode)
  lesson_content: `**Welcome to TCP/IP Protocols!**

Today we're diving deep into the heart of the Internet—the TCP/IP protocol suite. If Day 1 was about understanding the layers, Day 2 is about learning the actual protocols that make everything work!

**What is TCP/IP?**

TCP/IP stands for Transmission Control Protocol/Internet Protocol, and it's THE protocol suite that runs the Internet. Created by the Department of Defense (DoD) in the 1970s, it was designed to survive catastrophic events—even nuclear war! Pretty hardcore, right?

**The DoD Model vs OSI Model**

Remember the 7-layer OSI model from Day 1? Well, TCP/IP uses a simpler 4-layer model called the DoD model:

**Layer 4 - Process/Application** (combines OSI layers 5-7)
- Where applications live
- Protocols: HTTP, FTP, DNS, DHCP, SMTP

**Layer 3 - Host-to-Host** (OSI layer 4)
- Reliable delivery with TCP or fast delivery with UDP
- Port numbers identify applications

**Layer 2 - Internet** (OSI layer 3)
- IP addressing and routing
- Protocols: IP, ICMP, ARP

**Layer 1 - Network Access** (OSI layers 1-2)
- Physical network connection
- Ethernet, Wi-Fi, etc.

**🌐 Application Layer Protocols - The User-Facing Stuff**

**FTP (File Transfer Protocol) - Ports 20/21**
• Used to transfer files between computers
• Port 20 = data transfer, Port 21 = control
• Problem: Sends everything in clear text (not secure!)
• Authentication required but passwords travel unencrypted

**SFTP (Secure File Transfer Protocol) - Port 22**
• FTP but secure!
• Uses SSH encryption
• Same functionality as FTP but encrypted
• Default choice for secure file transfers today

**SSH (Secure Shell) - Port 22**
• Secure remote access to systems
• Replaces old Telnet (which was insecure)
• Encrypted connection for commands and data
• Used for remote administration

**Telnet - Port 23**
• OLD remote access protocol
• Terminal emulation
• NO encryption—everything in clear text!
• Replaced by SSH in modern networks
• Never use this for anything important!

**SMTP (Simple Mail Transfer Protocol) - Port 25**
• Used to SEND email
• Works with a "store and forward" system
• Email gets queued and sent when possible
• Note: SMTP sends, POP3/IMAP receives!

**DNS (Domain Name System) - Port 53**
• Converts domain names to IP addresses
• Example: www.google.com → 142.250.80.46
• Uses both TCP and UDP
• UDP for queries, TCP for zone transfers
• If DNS fails, you can ping IPs but not names!

**DHCP (Dynamic Host Configuration Protocol) - Ports 67/68**
• Automatically assigns IP addresses to devices
• Port 67 = server, Port 68 = client
• Much easier than manually configuring every device!
• DORA Process (remember this!):
  1. **D**iscover - Client broadcasts "I need an IP!"
  2. **O**ffer - Server responds "Here's an IP you can use"
  3. **R**equest - Client says "Yes, I'll take that IP"
  4. **A**cknowledge - Server confirms "It's yours!"

**What DHCP Can Provide:**
• IP address
• Subnet mask
• Default gateway
• DNS server addresses
• Domain name

**TFTP (Trivial File Transfer Protocol) - Port 69**
• Stripped-down version of FTP
• Uses UDP (connectionless, fast)
• No authentication, no security
• Used for network device configs and boot images
• Small and simple!

**HTTP (Hypertext Transfer Protocol) - Port 80**
• Powers the World Wide Web!
• Transfers web pages, images, videos
• NOT encrypted—everyone can see your data
• Being phased out in favor of HTTPS

**HTTPS (HTTP Secure) - Port 443**
• Secure version of HTTP using SSL/TLS
• Encrypted communication
• Modern browsers require this
• Look for the padlock icon 🔒
• Use HTTPS for anything sensitive!

**NTP (Network Time Protocol) - Port 123**
• Synchronizes clocks across networks
• Uses atomic clocks as time sources
• CRITICAL for logging, authentication, transactions
• Prevents "time travel" issues in databases!

**SNMP (Simple Network Management Protocol) - Ports 161/162**
• Manages and monitors network devices
• Port 161 = queries, Port 162 = traps (alerts)
• NMS (Network Management Station) polls devices
• Devices send "traps" when problems occur
• SNMPv3 adds encryption (use this version!)

**LDAP (Lightweight Directory Access Protocol) - Port 389**
• Accesses directory services like Active Directory
• Queries user and resource information
• LDAPS (port 636) adds SSL encryption
• Used for authentication and authorization

**Syslog - Port 514**
• Centralizes log messages from network devices
• Time-stamps and sequences messages
• Different severity levels (0-7)
• Essential for troubleshooting
• Can email admins based on severity

**POP3 (Post Office Protocol) - Port 110**
• Downloads email from server
• Deletes from server after download
• Simple but inflexible
• Being replaced by IMAP

**IMAP (Internet Message Access Protocol) - Port 143**
• More advanced email retrieval
• Keeps email on server
• Can organize in folders
• Search capabilities
• Better for multiple devices

**SMB (Server Message Block) - Port 445**
• Windows file and printer sharing
• Access files on network shares
• Also used for inter-process communication

**RDP (Remote Desktop Protocol) - Port 3389**
• Microsoft's remote desktop access
• Full graphical interface (not just command line)
• Like sitting at the remote computer
• Great for remote support

**SQL Server - Port 1433**
• Microsoft SQL Server default port
• Database connections
• Client systems connect here

**SIP (Session Initiation Protocol) - Ports 5060/5061**
• Sets up Voice over IP (VoIP) calls
• Video conferencing
• Works with RTP for actual media stream
• Port 5060 = unencrypted, 5061 = TLS encrypted

**🚀 Transport Layer Protocols - The Delivery Services**

**TCP (Transmission Control Protocol)**

Think of TCP as CERTIFIED MAIL:
• **Connection-oriented** - establishes connection first (three-way handshake)
• **Reliable** - guarantees delivery
• **Ordered** - segments arrive in sequence
• **Acknowledged** - sender gets confirmation
• **Flow control** - prevents overwhelming receiver
• **Error checking** - detects and corrects problems

**TCP Three-Way Handshake:**
1. **SYN** - "Hey, want to connect?"
2. **SYN-ACK** - "Sure! Let's connect!"
3. **ACK** - "Great! We're connected!"

**When to Use TCP:**
• Email (SMTP, POP3, IMAP)
• Web browsing (HTTP, HTTPS)
• File transfers (FTP, SFTP)
• Remote access (SSH, RDP)
• Anything where data MUST arrive correctly

**UDP (User Datagram Protocol)**

Think of UDP as POSTCARDS:
• **Connectionless** - no setup, just send!
• **Unreliable** - no delivery guarantee
• **Unordered** - packets may arrive out of sequence
• **No acknowledgment** - fire and forget
• **Low overhead** - fast and efficient
• **Lightweight** - minimal headers

**When to Use UDP:**
• Streaming video/audio (Netflix, Spotify)
• VoIP calls (Skype, Zoom)
• Online gaming
• DNS queries
• DHCP
• TFTP
• Anything where speed > reliability

**TCP vs UDP - The Showdown:**

**TCP Wins When:**
✅ Data must arrive correctly
✅ Order matters
✅ You need reliability
✅ Example: Downloading a file (can't have missing pieces!)

**UDP Wins When:**
✅ Speed is critical
✅ Small amounts of data
✅ Real-time is important
✅ Example: Live video stream (one dropped frame is okay)

**🌍 Internet Layer Protocols - The Routing Crew**

**IP (Internet Protocol)**

The BIG BOSS of networking:
• Logical addressing (IP addresses)
• Routing packets between networks
• Connectionless (no reliability)
• Best-effort delivery
• Fragmentation and reassembly

**IPv4 Header Fields:**
• Version, Header Length
• Type of Service (QoS)
• Total Length
• Time to Live (TTL) - hop limit
• Protocol (6=TCP, 17=UDP)
• Source/Destination IP addresses

**ICMP (Internet Control Message Protocol)**

The network's ERROR REPORTER:
• Sends error messages
• Destination Unreachable
• Time Exceeded
• Echo Request/Reply (Ping!)

**ICMP Tools:**
• **Ping** - Tests connectivity
  - Uses Echo Request/Reply
  - Checks if host is reachable
  
• **Traceroute** - Shows path to destination
  - Uses TTL expiration
  - Shows each router (hop) along the way

**ARP (Address Resolution Protocol)**

The DETECTIVE that finds hardware addresses:
• Resolves IP address → MAC address
• Broadcasts: "Who has IP 192.168.1.1?"
• Device responds: "That's me! My MAC is AA:BB:CC:DD:EE:FF"
• Only works on local network

**RARP (Reverse ARP)**

The opposite of ARP (rarely used now):
• Finds IP address from MAC address
• Used by diskless workstations
• Mostly obsolete (replaced by DHCP)

**GRE (Generic Routing Encapsulation)**

TUNNEL protocol:
• Encapsulates one protocol inside another
• Creates virtual point-to-point links
• No encryption by itself
• Often used with IPSec for security

**IPSec (IP Security)**

The SECURITY GUARD:
• Encrypts and authenticates IP packets
• Two main protocols:
  - **AH (Authentication Header)** - authentication only
  - **ESP (Encapsulating Security Payload)** - encryption + authentication
• Used for VPNs

**IKE (Internet Key Exchange)**

The NEGOTIATOR:
• Sets up IPSec connections
• Two phases:
  - **Phase 1** - Establishes secure channel (HAGLE agreement)
  - **Phase 2** - Negotiates IPSec parameters
• Manages encryption keys

**📦 Data Encapsulation - How It All Fits Together**

Remember, data gets wrapped at each layer:

**Layer 7-5:** Data
**Layer 4:** Segment (add TCP/UDP header)
**Layer 3:** Packet (add IP header)
**Layer 2:** Frame (add Ethernet header + trailer)
**Layer 1:** Bits (convert to electrical signals)

**Encapsulation Process (Sending):**
1. Application creates DATA
2. Transport adds port numbers → SEGMENT
3. Network adds IP addresses → PACKET
4. Data Link adds MAC addresses → FRAME
5. Physical converts to BITS

**De-encapsulation Process (Receiving):**
1. Physical receives BITS
2. Data Link reads FRAME, strips header
3. Network reads PACKET, strips header
4. Transport reads SEGMENT, strips header
5. Application receives DATA

**🎯 Port Numbers - The Apartment Numbers**

Think of IP addresses as street addresses and port numbers as apartment numbers!

**Port Ranges:**
• **0-1023:** Well-known ports (reserved)
• **1024-49151:** Registered ports
• **49152-65535:** Dynamic/Private ports

**Must-Know Ports (Memorize These!):**

**20/21** - FTP (File Transfer Protocol)
**22** - SSH/SFTP (Secure Shell)
**23** - Telnet (Insecure Remote Access)
**25** - SMTP (Send Email)
**53** - DNS (Domain Name System)
**67/68** - DHCP (Dynamic IP)
**69** - TFTP (Trivial FTP)
**80** - HTTP (Web - Insecure)
**110** - POP3 (Receive Email)
**123** - NTP (Network Time)
**143** - IMAP (Email - Better than POP3)
**161/162** - SNMP (Network Management)
**389** - LDAP (Directory Services)
**443** - HTTPS (Web - Secure) ⭐
**445** - SMB (Windows File Sharing)
**514** - Syslog (Logging)
**587** - SMTPS (Secure SMTP)
**636** - LDAPS (Secure LDAP)
**993** - IMAPS (Secure IMAP)
**995** - POP3S (Secure POP3)
**1433** - SQL Server
**1521** - Oracle SQLnet
**3306** - MySQL
**3389** - RDP (Remote Desktop)
**5060/5061** - SIP (VoIP)

**🔒 Security Tip!**

Always use encrypted versions:
• ❌ FTP → ✅ SFTP
• ❌ Telnet → ✅ SSH
• ❌ HTTP → ✅ HTTPS
• ❌ SMTP → ✅ SMTPS
• ❌ LDAP → ✅ LDAPS
• ❌ IMAP → ✅ IMAPS

**Study Tips for Day 2:**

1. **Make flashcards** for port numbers
2. **Draw the DoD model** from memory
3. **Practice the DORA process** (DHCP)
4. **Understand TCP vs UDP** - when to use each
5. **Remember the three-way handshake** (SYN, SYN-ACK, ACK)
6. **Know common ports** - you WILL see these on the exam!
7. **Understand encapsulation** - data → segment → packet → frame → bits

**Real-World Scenarios:**

**Scenario 1:** Can't access website by name but can ping IP
**Problem:** DNS issue!
**Solution:** Check DNS settings, try different DNS server

**Scenario 2:** Device can't get IP address
**Problem:** DHCP issue!
**Solution:** Check DHCP server, verify DORA process

**Scenario 3:** Remote access needed but Telnet blocked
**Problem:** Security policy blocks insecure protocols
**Solution:** Use SSH instead (port 22)

**Scenario 4:** File transfer needed but FTP blocked
**Problem:** FTP is insecure
**Solution:** Use SFTP (port 22)

You're now equipped with the protocols that power the Internet! 🚀`,

  // TEXTBOOK CONTENT (Formal Academic Style)
  lesson_textbook: `**Chapter 6: Introduction to the Internet Protocol**

**Objectives**
Upon completion of this chapter, you will be able to:
• Explain the TCP/IP protocol suite and its relationship to the OSI model
• Describe the DoD model and its four layers
• Identify and explain Process/Application layer protocols and their port numbers
• Differentiate between TCP and UDP at the Host-to-Host layer
• Understand Internet layer protocols including IP, ICMP, ARP, and IPSec
• Explain the data encapsulation and de-encapsulation process
• Identify well-known port numbers for common services

**6.1 Introduction to TCP/IP**

The Transmission Control Protocol/Internet Protocol (TCP/IP) suite was created by the Department of Defense (DoD) to ensure and preserve data integrity as well as to maintain communications in the event of catastrophic war. When designed and implemented correctly, a TCP/IP network provides a solid, dependable, and resilient network solution.

The development of TCP/IP began in the late 1960s with ARPAnet, the precursor to the modern Internet. The first Request for Comments (RFC) was published in April 1969, establishing the foundation for today's Internet protocols. TCP was initially specified in 1974 and later divided into two distinct protocols—TCP and IP—which were formally documented in an RFC in 1980. In 1983, TCP/IP replaced the Network Control Protocol (NCP) and became the official data transport standard for all systems connecting to ARPAnet.

**6.2 The DoD Model**

The DoD model represents a condensed version of the OSI reference model, consisting of four layers instead of seven:

**Process/Application Layer** - Equivalent to OSI layers 7, 6, and 5
**Host-to-Host Layer** - Equivalent to OSI layer 4
**Internet Layer** - Equivalent to OSI layer 3
**Network Access Layer** - Equivalent to OSI layers 2 and 1

**6.2.1 Comparison with the OSI Model**

When discussing protocols in the IP stack, the Internet layer and the Network layer are interchangeable, as are the Host-to-Host layer and the Transport layer. The Process/Application and Network Access layers of the DoD model comprise multiple layers of the OSI model.

The Process/Application layer integrates the various activities and functions spanning the OSI's top three layers (Application, Presentation, and Session). It defines protocols for node-to-node application communication and controls user-interface specifications.

The Host-to-Host layer parallels the OSI's Transport layer functions, defining protocols for establishing transmission service levels for applications. It addresses reliable end-to-end communication, error-free data delivery, packet sequencing, and data integrity maintenance.

The Internet layer corresponds to the OSI's Network layer, designating protocols for the logical transmission of packets across networks. It manages logical host addressing through IP addresses and handles packet routing among multiple networks.

The Network Access layer, equivalent to the OSI's Data Link and Physical layers, monitors data exchange between hosts and networks. It oversees hardware addressing and defines protocols for physical data transmission.

**6.3 Process/Application Layer Protocols**

**6.3.1 File Transfer Protocol (FTP) - TCP Ports 20/21**

File Transfer Protocol (FTP) facilitates file transfers across IP networks between any two machines using the protocol. FTP functions both as a protocol used by applications and as a program employed by users for manual file operations.

FTP provides directory access and manipulation capabilities, including file relocation between directories. Access requires authentication through username and password credentials, though anonymous access with limited privileges is sometimes permitted. FTP transmits all data, including authentication credentials, in clear text, presenting significant security vulnerabilities.

**6.3.2 Secure Shell (SSH) - TCP Port 22**

Secure Shell (SSH) establishes secure Telnet sessions over standard TCP/IP connections. SSH is employed for system login, remote program execution, and file movement between systems while maintaining encrypted communications. It has largely replaced legacy protocols such as rsh, rlogin, and Telnet in modern networking environments.

**6.3.3 Secure File Transfer Protocol (SFTP) - TCP Port 22**

Secure File Transfer Protocol (SFTP) provides encrypted file transfer capabilities using SSH sessions. Because SFTP utilizes SSH for security, it operates on port 22. Apart from encryption, SFTP functionality mirrors traditional FTP for file transfers across IP networks.

**6.3.4 Telnet - TCP Port 23**

Telnet provides terminal emulation services, allowing remote client machines (Telnet clients) to access resources on Telnet servers. Telnet creates a software shell—a virtual terminal—that interacts with the chosen remote host. These emulated terminals are text-mode and can execute refined procedures such as menu displays.

Telnet provides no security or encryption and has been superseded by Secure Shell (SSH) when security is required for remote-configuration sessions.

**6.3.5 Simple Mail Transfer Protocol (SMTP) - TCP Port 25**

Simple Mail Transfer Protocol (SMTP) uses a spooled, or queued, method of mail delivery. When a message is sent, it is spooled to a storage device (typically disk). Server software regularly monitors the queue, detecting and delivering messages to their destinations. SMTP handles message transmission; POP3 or IMAP handles message reception.

**6.3.6 Domain Name System (DNS) - TCP and UDP Port 53**

Domain Name System (DNS) resolves hostnames to their corresponding IP addresses. While direct IP address communication is possible, DNS simplifies network resource access by allowing domain names to identify hosts. This abstraction permits IP address changes without affecting user accessibility.

DNS resolves fully qualified domain names (FQDNs)—such as www.example.com—to IP addresses. An FQDN, or DNS namespace, represents a hierarchy for logically locating systems based on domain identifiers.

**Important:** If a device responds to ping using its IP address but not its FQDN, DNS configuration failure may have occurred.

**6.3.7 Dynamic Host Configuration Protocol (DHCP) - UDP Ports 67/68**

Dynamic Host Configuration Protocol (DHCP) assigns IP addresses to hosts using information provided by a server. DHCP simplifies administration and scales effectively from small to large network environments. Various hardware types, including routers, can function as DHCP servers.

DHCP evolved from Bootstrap Protocol (BootP), which assigned IP addresses but required manual hardware address entry in BootP tables. DHCP provides dynamic address allocation without manual configuration.

**DHCP Server Information:**
• IP address
• Subnet mask
• Domain name
• Default gateway (router address)
• DNS server addresses

**The DORA Process:**

DHCP clients follow a four-step process (DORA) to receive IP addresses:

**1. Discover** - The DHCP client broadcasts a DHCP Discover message seeking a DHCP server (port 67).

**2. Offer** - The DHCP server receiving the Discover message sends a unicast DHCP Offer message back to the host.

**3. Request** - The client broadcasts a DHCP Request message to the server, requesting the offered IP address and additional information.

**4. Acknowledgment** - The server finalizes the exchange with a unicast DHCP Acknowledgment message.

DHCP operates at layers 2 and 3 simultaneously. Layer 2 broadcasts use all Fs in hexadecimal (FF:FF:FF:FF:FF:FF), while Layer 3 broadcasts use 255.255.255.255 (all networks and hosts). DHCP is connectionless, utilizing User Datagram Protocol (UDP) at the Transport layer.

**Automatic Private IP Addressing (APIPA):** When a DHCP server is unavailable, Windows operating systems implement APIPA, allowing clients to self-configure IP addresses in the 169.254.0.1 through 169.254.255.254 range with a default Class B subnet mask of 255.255.0.0.

**6.3.8 Trivial File Transfer Protocol (TFTP) - UDP Port 69**

Trivial File Transfer Protocol (TFTP) provides a simplified file transfer mechanism. TFTP lacks directory-browsing capabilities and can only send and receive files. It transmits smaller data blocks than FTP and provides no authentication, creating inherent security risks. TFTP's simplicity makes it suitable for network device configuration transfers and boot image downloads.

**6.3.9 Hypertext Transfer Protocol (HTTP) - TCP Port 80**

Hypertext Transfer Protocol (HTTP) manages communications between web browsers and servers, facilitating resource access through hyperlinks. HTTP does not encrypt data during client-server communication, making HTTPS the preferred protocol for modern web applications.

**6.3.10 Post Office Protocol v3 (POP3) - TCP Port 110**

Post Office Protocol version 3 (POP3) provides storage facilities for incoming mail. When client devices connect to POP3 servers, messages are downloaded and typically deleted from the server. POP3 does not support selective message downloading. IMAP increasingly replaces POP3 due to enhanced flexibility and security.

**6.3.11 Network Time Protocol (NTP) - UDP Port 123**

Network Time Protocol (NTP) synchronizes computer clocks to a standard time source (typically atomic clocks). NTP works with other synchronization utilities to ensure all network computers maintain consistent time references. Time synchronization prevents transaction errors where client timestamps precede server timestamps, which could cause system failures.

**6.3.12 Internet Message Access Protocol (IMAP) - TCP Port 143**

Internet Message Access Protocol (IMAP) provides enhanced control over mail downloading compared to POP3. IMAP permits examination of message headers or partial message downloads without committing to full downloads. Users can store messages on email servers hierarchically and link to documents and user groups. IMAP provides search commands for message location based on subject, header, or content. IMAP4 is the current version and supports Kerberos authentication.

**6.3.13 Simple Network Management Protocol (SNMP) - UDP Ports 161/162**

Simple Network Management Protocol (SNMP) collects and manipulates network information. SNMP gathers data by polling network devices from a management station at fixed or random intervals, requiring disclosure of specific information. When operational parameters fall within normal ranges, SNMP receives a baseline report. SNMP agents send traps (alerts) to management stations when aberrations occur. Network Management Systems (NMS) poll agents through Management Information Bases (MIBs)—databases containing predefined questions the NMS asks agents regarding device and network health.

**SNMP Versions:**
• **SNMPv1** - Original version, now obsolete, minimal security
• **SNMPv2** - Performance improvements, including GETBULK operation, never widely adopted
• **SNMPv3** - Current standard, uses TCP and UDP, adds security, message integrity, authentication, and encryption

**6.3.14 Lightweight Directory Access Protocol (LDAP) - TCP Port 389**

Lightweight Directory Access Protocol (LDAP) accesses and queries directory services systems such as Microsoft Active Directory. LDAP standardizes directory access methods. LDAP version 3, described in RFC 3377, addresses issues found in earlier versions documented in RFCs 1487 and 1777. LDAPS (port 636) provides secure LDAP communications through SSL.

**6.3.15 Hypertext Transfer Protocol Secure (HTTPS) - TCP Port 443**

Hypertext Transfer Protocol Secure (HTTPS) secures transactions between web browsers and servers. HTTPS provides security tools for form submission, authentication, and HTTP message encryption for online reservations and purchases. Modern browsers require HTTPS encryption or display privacy warnings.

**6.3.16 Transport Layer Security/Secure Sockets Layer (TLS/SSL)**

Transport Layer Security (TLS) and its predecessor, Secure Sockets Layer (SSL), are cryptographic protocols enabling secure online data transfer for web browsing, instant messaging, Internet faxing, and similar activities. Both use X.509 certificates and asymmetric cryptography for host authentication and key exchange. The exchanged key encrypts data flowing between hosts, providing data confidentiality, message integrity, and message authentication.

**6.3.17 Server Message Block (SMB) - TCP Port 445**

Server Message Block (SMB) provides shared access to files and printers and facilitates communications between hosts on Microsoft Windows networks. SMB primarily operates on TCP port 445 but can also use UDP ports 137 and 138 and TCP ports 137 and 139 through NetBIOS.

**6.3.18 Syslog - UDP Port 514**

Syslog provides centralized logging services, collecting system messages from network devices. Syslog servers store, timestamp, and sequence messages. The protocol displays, sorts, and searches messages, making it an effective troubleshooting tool. Administrators can configure syslog to email alerts based on message severity levels.

**Syslog Severity Levels:**

Level 0 - Emergency: System unusable
Level 1 - Alert: Immediate action needed
Level 2 - Critical: Critical condition
Level 3 - Error: Error condition
Level 4 - Warning: Warning condition
Level 5 - Notification: Normal but significant condition
Level 6 - Information: Normal information message
Level 7 - Debugging: Debugging message

**6.3.19 SMTPS - TCP Port 587**

SMTPS (Simple Mail Transfer Protocol Secure) encrypts email during transmission. Most modern email servers use port 587 for encrypted email transmission, following IETF guidelines. Port 587, coupled with TLS encryption, ensures secure email transmission.

**6.3.20 LDAPS - TCP Port 636**

LDAP over SSL (LDAPS) secures LDAP traffic using SSL encryption on TCP port 636. Proper implementation requires certificate installation from a certification authority (CA).

**6.3.21 SQL Server - TCP Port 1433**

Microsoft SQL Server uses TCP port 1433 as the default port for database engine connections. This is the official IANA socket number for SQL Server, used by client systems to connect to the database engine.

**6.3.22 Remote Desktop Protocol (RDP) - TCP Port 3389**

Remote Desktop Protocol (RDP) is a proprietary Microsoft protocol enabling remote computer connections and program execution. RDP provides graphical user interfaces of remote computers, unlike Telnet's command-line interface. Microsoft currently designates its RDP server software as Remote Desktop Services (formerly Terminal Services) and its client software as Remote Desktop Connection (formerly Terminal Services Client).

**6.3.23 Session Initiation Protocol (SIP) - TCP or UDP Ports 5060/5061**

Session Initiation Protocol (SIP) is a signaling protocol used for constructing and deconstructing multimedia communication sessions, including voice calls, video calls, videoconferencing, streaming multimedia, instant messaging, presence information, and online gaming. SIP commonly works with RTP (Real-time Transport Protocol) to establish connections between endpoints.

**6.4 Host-to-Host Layer Protocols**

The Host-to-Host layer shields upper-layer applications from network complexities. It accepts data streams from upper layers with instructions and prepares information for transmission.

**6.4.1 Transmission Control Protocol (TCP)**

Transmission Control Protocol (TCP) segments large information blocks from applications into smaller segments. It numbers and sequences each segment so the destination TCP process can reassemble them in the correct order. TCP waits for acknowledgments from the receiving end and retransmits unacknowledged segments.

TCP establishes connection-oriented communication through sessions (call setup or three-way handshake). After data transfer completes, call termination tears down the virtual circuit.

**TCP Characteristics:**
• Full-duplex communication
• Connection-oriented
• Reliable and accurate
• Comprehensive error checking
• High network overhead
• Complex protocol implementation

**TCP Segment Format:**

The TCP header contains 24 bytes minimum (up to 60 bytes with options). Key fields include:

**Source Port** - Port number of the sending application
**Destination Port** - Port number of the destination application
**Sequence Number** - Number used for data ordering and retransmission
**Acknowledgment Number** - Expected next TCP octet
**Header Length** - Number of 32-bit words in TCP header
**Code Bits/TCP Flags** - Controls session setup and termination
**Window** - Sender's acceptable window size in octets
**Checksum** - CRC for header and data fields
**Urgent** - Valid only if Urgent pointer is set in code bits
**Options** - Optional fields (0 or multiple of 32 bits)
**Data** - Upper-layer payload

**6.4.2 User Datagram Protocol (UDP)**

User Datagram Protocol (UDP) is a thin protocol using minimal network bandwidth. UDP provides information transport without reliability mechanisms, making it suitable for applications that don't require reliable delivery.

**UDP Characteristics:**
• Connectionless
• Unreliable (no delivery guarantee)
• Unsequenced
• No acknowledgments
• No flow control
• Low overhead
• Fast transmission

UDP is appropriate when:
• Applications handle reliability at the Process/Application layer
• Speed is prioritized over reliability
• Intermittent status updates are sent (SNMP)
• Real-time applications cannot tolerate retransmission delays

**6.4.3 Key Concepts of Host-to-Host Protocols**

**TCP Characteristics:**
• Sequenced segments
• Reliable delivery
• Connection-oriented
• Virtual circuit establishment
• Acknowledgment system
• Windowing flow control

**UDP Characteristics:**
• Unsequenced datagrams
• Unreliable delivery
• Connectionless
• Low overhead
• No acknowledgments
• No windowing or flow control

**6.4.4 Port Numbers**

TCP and UDP use port numbers to communicate with upper layers and track simultaneous conversations. Originating source port numbers are dynamically assigned by source hosts with values of 1024 or higher. Ports 1023 and below are well-known port numbers defined in RFC 3232.

**Port Number Ranges:**
• **0-1023:** Well-known ports (reserved)
• **1024-49151:** Registered ports
• **49152-65535:** Dynamic/private ports

**Common TCP Ports:**
Telnet (23), SMTP (25), HTTP (80), FTP (20, 21), SFTP (22), DNS (53), HTTPS (443), SSH (22), SMB (445), POP3 (110), IMAP4 (143), RDP (3389), SNMPv3 (161), LDAP (389), SMTPS (587), LDAPS (636), SQL (1433), SIP (5060/5061)

**Common UDP Ports:**
SNMPv1/2 (161), TFTP (69), DNS (53), BOOTPS/DHCP (67, 68), NTP (123), Syslog (514), SIP (5060/5061)

**6.5 Internet Layer Protocols**

The Internet layer serves two primary functions: routing and providing a single network interface to upper layers. Only the Internet layer performs routing functions. The Internet layer also provides a single network interface to upper-layer protocols, preventing application programmers from writing separate code for each Network Access protocol.

**6.5.1 Internet Protocol (IP)**

Internet Protocol (IP) represents the Internet layer's primary protocol. All other protocols at this layer support IP. IP maintains awareness of all interconnected networks through software (logical) addresses called IP addresses.

IP examines each packet's destination address and uses routing tables to determine the next transmission hop, selecting the best path. Network Access layer protocols lack IP's comprehensive network awareness, dealing only with physical links (local networks).

**IPv4 Header Fields:**
**Version** - IP version number
**Header Length (HLEN)** - Header length in 32-bit words
**Priority and Type of Service** - Handling instructions for datagrams
**Total Length** - Packet length including header and data
**Identification** - Unique packet value differentiating fragmented packets
**Flags** - Specifies fragmentation permissions
**Fragment Offset** - Provides fragmentation and reassembly for large packets
**Time To Live (TTL)** - Limits packet lifetime to prevent endless circulation
**Protocol** - Upper-layer protocol port (TCP=6, UDP=17)
**Header Checksum** - CRC on header only
**Source IP Address** - 32-bit sending station address
**Destination IP Address** - 32-bit destination station address
**Options** - Used for testing, debugging, and security
**Data** - Upper-layer data following IP options

**6.5.2 Internet Control Message Protocol (ICMP)**

Internet Control Message Protocol (ICMP) operates at the Network layer, providing management and messaging services for IP. ICMP messages are encapsulated within IP datagrams.

**ICMP Functions:**
• Provide hosts with network problem information
• Encapsulate within IP datagrams

**Common ICMP Messages:**

**Destination Unreachable** - Routers send ICMP messages to senders when datagrams cannot be forwarded further.

**Buffer Full** - Routers with full memory buffers send ICMP messages until congestion subsides.

**Hops (TTL Expiration)** - When datagrams reach hop limits before arriving at destinations, the last router sends ICMP notifications to sending machines.

**Ping** - Uses ICMP echo request and reply messages to verify physical and logical connectivity.

**Traceroute** - Uses IP packet TTL timeouts to discover packet paths through internetworks.

**6.5.3 Address Resolution Protocol (ARP)**

Address Resolution Protocol (ARP) resolves hardware addresses from known IP addresses. When IP must send datagrams, it must inform Network Access protocols (Ethernet, wireless) of destination hardware addresses on local networks. If IP doesn't find destination hardware addresses in ARP cache, it uses ARP.

ARP interrogates local networks by broadcasting requests asking machines with specified IP addresses to reply with hardware addresses. ARP translates software (IP) addresses into hardware addresses (Ethernet addresses).

**6.5.4 Reverse Address Resolution Protocol (RARP)**

Reverse Address Resolution Protocol (RARP) discovers IP addresses for diskless machines. Diskless machines know their MAC addresses but not IP addresses. RARP broadcasts packets including MAC addresses and requests for assigned IP addresses. RARP servers respond with answers, completing machine identification.

**6.5.5 Generic Routing Encapsulation (GRE)**

Generic Routing Encapsulation (GRE) is a tunneling protocol that encapsulates multiple protocols inside IP tunnels. Examples include routing protocols (EIGRP, OSPF) and routed protocols (IPv6).

**GRE Characteristics:**
• Supports any layer 3 protocol through protocol-type field
• Stateless with no flow control
• Provides no security
• Creates minimum 24-byte overhead for tunneled packets

**GRE Header Components:**
• Passenger protocol (encapsulated protocol like IP or IPv6)
• GRE encapsulation protocol
• Transport delivery protocol (typically IP)

**6.5.6 Internet Protocol Security (IPSec)**

IPSec provides secure tunneling across IP networks but has limitations. IPSec does not support IP broadcast, IP multicast, or multiprotocol traffic. GRE tunnels with IPSec allow routing protocol operation, IP multicast, and multiprotocol traffic across networks.

**Authentication Header (AH):**

AH provides authentication for data and IP headers using one-way hashes for packet authentication. Senders generate one-way hashes; receivers generate identical hashes. If packets change during transmission, they fail authentication and are dropped. AH guarantees authenticity but provides no encryption.

**Encapsulating Security Payload (ESP):**

ESP provides confidentiality, data origin authentication, connectionless integrity, anti-replay service, and limited traffic-flow confidentiality.

**ESP Components:**

**Confidentiality (Encryption)** - Allows sending devices to encrypt packets before transmission, preventing eavesdropping through symmetric encryption algorithms.

**Cryptographic Algorithms:**
• HMAC-SHA1/SHA2 for integrity and authenticity
• TripleDES-CBC for confidentiality
• AES-CBC for confidentiality
• AES-GCM and ChaCha20-Poly1305 for combined confidentiality and authentication

**Data Integrity** - Allows receivers to verify that received data was not altered during transmission through checksums.

**Authentication** - Ensures connections are established with correct partners by guaranteeing and certifying information sources.

**Anti-Replay Service** - Based on receiver verification of sequence numbers, preventing replay attacks where authenticated packets are copied and retransmitted to disrupt services.

**Traffic Flow** - Requires tunnel mode implementation and is most effective at security gateways with high traffic volumes, masking true source-destination patterns.

**Internet Key Exchange (IKE):**

IKE is a management protocol used to negotiate security associations (SA) between endpoints. Security associations define authentication, encryption, and IPSec protocols for establishing IPSec connections.

IKE uses Internet Security Association and Key Management Protocol (ISAKMP) to manage two connection phases:

**Phase 1 (Main mode)** - Parameters (policies) are negotiated between endpoints. The HAGLE (hash, authentication, group, lifetime, encryption) is agreed upon to establish shared policies. After agreement, both parties authenticate and calculate shared secret symmetrical encryption keys. Upon successful authentication, initial encryption tunnels are created between endpoints.

**Phase 2 (Quick mode)** - IPSec negotiation and connection occur. Initial encryption tunnels created in phase 1 encrypt negotiations of protocols and algorithms for phase 2. This negotiation is the IPSec transform set, containing details about AH and ESP protocols between endpoints, including encryption, hashing, and IPSec tunnel operational mode.

**6.6 Data Encapsulation**

Data encapsulation is the process of wrapping data with protocol information at each OSI model layer. Each layer communicates only with its peer layer on receiving devices.

Layers use protocol data units (PDUs) for communication and information exchange. PDUs contain control information attached to data at each model layer, usually in headers preceding data fields but potentially in trailers at the end.

**Encapsulation Process (Transmitting Device):**

**Step 1** - User information converts to data for network transmission.

**Step 2** - Data converts to segments; reliable connections establish between transmitting and receiving hosts.

**Step 3** - Segments convert to packets or datagrams; logical addresses are placed in headers for internetwork routing.

**Step 4** - Packets or datagrams convert to frames for local network transmission. Hardware (Ethernet) addresses uniquely identify hosts on local network segments.

**Step 5** - Frames convert to bits using digital encoding and clocking schemes.

**PDU Names by Layer:**
• **Data** - Upper layers (Application, Presentation, Session)
• **Segment** - Transport layer
• **Packet/Datagram** - Network layer
• **Frame** - Data Link layer
• **Bits** - Physical layer

The data stream is handed to the Transport layer, which establishes virtual circuits by sending synchronization packets. Data streams are segmented, and Transport layer headers (PDUs) attach to data fields, creating segments. Each segment is sequenced for proper reassembly at receiving sides.

Segments are handed to the Network layer for network addressing and internetwork routing. Logical addressing (IP) directs each segment to correct networks. Network layer protocols add control headers to segments from Transport layers, creating packets or datagrams. Transport and Network layers work together to rebuild data streams on receiving hosts but do not place PDUs on local network segments.

The Data Link layer takes packets from Network layers and places them on network media (cable or wireless). Data Link layers encapsulate packets in frames. Frame headers carry source and destination host hardware addresses. For remote network destinations, frames are sent to routers for internetwork routing. Upon reaching destination networks, new frames deliver packets to destination hosts.

To place frames on networks, they must first convert to digital signals. Because frames are logical groups of 1s and 0s, Physical layers encode these digits into digital signals read by devices on local networks. Receiving devices synchronize on digital signals and extract (decode) 1s and 0s. Devices then build frames, run cyclic redundancy checks (CRC), and check answers against Frame Check Sequence (FCS) fields. With matches, packets are extracted from frames, and remaining frames are discarded. This process is de-encapsulation.

Packets are handed to Network layers, where addresses are checked. With address matches, segments are extracted from packets, and remaining packets are discarded. Segments are processed at Transport layers, which rebuild data streams and send acknowledgments to transmitting stations confirming receipt of each piece. Data streams are then handed to upper-layer applications.

**De-encapsulation Process (Receiving Device):**

Physical layers receive bits and pass frames to Data Link layers. Data Link layers strip frame headers/trailers and pass packets to Network layers. Network layers remove packet headers and pass segments to Transport layers. Transport layers reassemble segments and pass data to Application layers.

**Summary**

The TCP/IP protocol suite provides the foundation for Internet communications. The DoD model's four layers (Process/Application, Host-to-Host, Internet, Network Access) parallel the OSI model's seven layers while offering a more practical implementation framework.

Process/Application layer protocols provide user-facing services through standardized port numbers. TCP provides reliable, connection-oriented communication, while UDP offers fast, connectionless transmission. Internet layer protocols handle logical addressing, routing, and error messaging. Data encapsulation wraps data with protocol information at each layer, with corresponding de-encapsulation occurring at receiving devices.

Understanding these protocols, their port numbers, and their functions is essential for network design, implementation, troubleshooting, and professional certification.

**Key Terms**

• **TCP/IP** - Transmission Control Protocol/Internet Protocol suite
• **DoD Model** - Four-layer protocol model (Process/Application, Host-to-Host, Internet, Network Access)
• **DORA Process** - DHCP four-step address assignment (Discover, Offer, Request, Acknowledge)
• **Three-Way Handshake** - TCP connection establishment (SYN, SYN-ACK, ACK)
• **Well-Known Ports** - Port numbers 0-1023 reserved for standard services
• **TCP** - Connection-oriented, reliable Transport layer protocol
• **UDP** - Connectionless, unreliable Transport layer protocol
• **Encapsulation** - Process of adding protocol headers at each layer
• **De-encapsulation** - Process of removing protocol headers at each layer
• **PDU (Protocol Data Unit)** - Data unit at specific layers with unique names`,

  // SUMMARY CONTENT
  lesson_summary: `**Quick Summary: TCP/IP Protocols & Ports**

**DoD Model (4 Layers):**
4. Process/Application (OSI 5-7) - User protocols, port numbers
3. Host-to-Host (OSI 4) - TCP/UDP
2. Internet (OSI 3) - IP addressing, routing
1. Network Access (OSI 1-2) - Physical connection

**Critical Ports to Memorize:**
20/21 - FTP | 22 - SSH/SFTP | 23 - Telnet | 25 - SMTP
53 - DNS | 67/68 - DHCP | 69 - TFTP | 80 - HTTP
110 - POP3 | 123 - NTP | 143 - IMAP | 161/162 - SNMP
389 - LDAP | 443 - HTTPS ⭐ | 445 - SMB | 514 - Syslog
587 - SMTPS | 636 - LDAPS | 993 - IMAPS | 995 - POP3S
1433 - SQL Server | 3306 - MySQL | 3389 - RDP | 5060/5061 - SIP

**TCP vs UDP:**
• TCP = Reliable, connection-oriented, slow (email, web, FTP)
• UDP = Fast, connectionless, unreliable (streaming, VoIP, DNS)

**TCP Three-Way Handshake:**
1. SYN - "Let's connect"
2. SYN-ACK - "Agreed"
3. ACK - "Connected"

**DHCP DORA Process:**
1. Discover - Client broadcasts request
2. Offer - Server offers IP
3. Request - Client accepts offer
4. Acknowledge - Server confirms

**Key Protocols:**

**Application Layer:**
• FTP (20/21) - File transfer, insecure
• SFTP (22) - Secure file transfer
• SSH (22) - Secure remote access
• Telnet (23) - Insecure remote access (obsolete)
• SMTP (25) - Send email
• DNS (53) - Name to IP resolution (TCP + UDP)
• DHCP (67/68) - Dynamic IP assignment
• HTTP (80) - Web, insecure
• HTTPS (443) - Web, secure
• POP3 (110) - Download email
• NTP (123) - Time synchronization
• IMAP (143) - Email with server sync
• SNMP (161/162) - Network management
• LDAP (389) - Directory services
• RDP (3389) - Remote desktop
• SIP (5060/5061) - VoIP signaling

**Transport Layer:**
• TCP - Reliable, ordered, connection-oriented
• UDP - Fast, unordered, connectionless

**Internet Layer:**
• IP - Logical addressing, routing
• ICMP - Error messages, Ping, Traceroute
• ARP - IP to MAC resolution
• RARP - MAC to IP (obsolete)
• GRE - Tunneling protocol
• IPSec - VPN security (AH + ESP)
• IKE - IPSec key negotiation

**Security Upgrades:**
FTP → SFTP | Telnet → SSH | HTTP → HTTPS
SMTP → SMTPS | LDAP → LDAPS | IMAP → IMAPS

**Encapsulation Order:**
Data → Segment (L4) → Packet (L3) → Frame (L2) → Bits (L1)

**Troubleshooting:**
• Can ping IP but not name = DNS problem
• Can't get IP = DHCP problem
• Use encrypted versions of protocols for security

**Exam Tips:**
✅ Memorize all port numbers
✅ Know TCP vs UDP use cases
✅ Understand DHCP DORA process
✅ Know TCP three-way handshake
✅ Remember which protocols use which transport layer protocol`,

  // QUIZ QUESTIONS
  quiz_questions: [
    {
      question: "Which protocol uses ports 20 and 21?",
      options: ["SSH", "FTP", "SFTP", "Telnet"],
      correct_answer: "FTP"
    },
    {
      question: "What port does HTTPS use?",
      options: ["80", "443", "22", "8080"],
      correct_answer: "443"
    },
    {
      question: "Which protocol is connection-oriented and reliable?",
      options: ["UDP", "ICMP", "TCP", "ARP"],
      correct_answer: "TCP"
    },
    {
      question: "What does the 'D' in the DHCP DORA process stand for?",
      options: ["Deliver", "Discover", "Designate", "Download"],
      correct_answer: "Discover"
    },
    {
      question: "Which protocol resolves IP addresses to MAC addresses?",
      options: ["RARP", "DNS", "ARP", "DHCP"],
      correct_answer: "ARP"
    },
    {
      question: "What is the secure alternative to Telnet?",
      options: ["FTP", "SSH", "HTTP", "SMTP"],
      correct_answer: "SSH"
    },
    {
      question: "Which protocol uses port 53?",
      options: ["DHCP", "DNS", "FTP", "TFTP"],
      correct_answer: "DNS"
    },
    {
      question: "What are the three steps in the TCP three-way handshake?",
      options: ["SYN, ACK, FIN", "CONNECT, SEND, CLOSE", "SYN, SYN-ACK, ACK", "REQUEST, REPLY, CONFIRM"],
      correct_answer: "SYN, SYN-ACK, ACK"
    },
    {
      question: "Which protocol is used for sending email?",
      options: ["POP3", "IMAP", "SMTP", "HTTP"],
      correct_answer: "SMTP"
    },
    {
      question: "What port does SSH use?",
      options: ["21", "22", "23", "25"],
      correct_answer: "22"
    },
    {
      question: "Which transport protocol is faster but unreliable?",
      options: ["TCP", "UDP", "ICMP", "ARP"],
      correct_answer: "UDP"
    },
    {
      question: "What protocol synchronizes network device clocks?",
      options: ["NTP", "SNMP", "DNS", "DHCP"],
      correct_answer: "NTP"
    },
    {
      question: "Which protocol is used for remote desktop access on Windows?",
      options: ["SSH", "Telnet", "RDP", "VNC"],
      correct_answer: "RDP"
    },
    {
      question: "What ports does DHCP use?",
      options: ["20/21", "67/68", "80/443", "110/143"],
      correct_answer: "67/68"
    },
    {
      question: "Which IPSec protocol provides both encryption and authentication?",
      options: ["AH", "ESP", "IKE", "GRE"],
      correct_answer: "ESP"
    }
  ],

  // FLASHCARDS
  flashcards: [
    { term: "FTP (20/21)", definition: "File Transfer Protocol - Transfers files but insecure (clear text)" },
    { term: "SFTP (22)", definition: "Secure FTP - Encrypted file transfer using SSH" },
    { term: "SSH (22)", definition: "Secure Shell - Encrypted remote access, replaces Telnet" },
    { term: "Telnet (23)", definition: "Insecure remote access - never use! Everything in clear text" },
    { term: "SMTP (25)", definition: "Simple Mail Transfer Protocol - Sends email" },
    { term: "DNS (53)", definition: "Domain Name System - Converts names to IP addresses" },
    { term: "DHCP (67/68)", definition: "Dynamic Host Configuration Protocol - Auto-assigns IP addresses" },
    { term: "TFTP (69)", definition: "Trivial FTP - Simple, no auth, uses UDP" },
    { term: "HTTP (80)", definition: "Hypertext Transfer Protocol - Web traffic, insecure" },
    { term: "HTTPS (443)", definition: "HTTP Secure - Encrypted web traffic with SSL/TLS" },
    { term: "POP3 (110)", definition: "Post Office Protocol - Downloads email, deletes from server" },
    { term: "NTP (123)", definition: "Network Time Protocol - Synchronizes clocks" },
    { term: "IMAP (143)", definition: "Internet Message Access Protocol - Email stays on server" },
    { term: "SNMP (161/162)", definition: "Simple Network Management Protocol - Monitors devices" },
    { term: "LDAP (389)", definition: "Lightweight Directory Access Protocol - Directory queries" },
    { term: "RDP (3389)", definition: "Remote Desktop Protocol - Windows remote desktop" },
    { term: "SIP (5060/5061)", definition: "Session Initiation Protocol - VoIP call setup" },
    { term: "TCP", definition: "Transmission Control Protocol - Reliable, connection-oriented, slow" },
    { term: "UDP", definition: "User Datagram Protocol - Fast, connectionless, unreliable" },
    { term: "Three-Way Handshake", definition: "TCP connection: SYN → SYN-ACK → ACK" },
    { term: "DORA Process", definition: "DHCP: Discover → Offer → Request → Acknowledge" },
    { term: "ARP", definition: "Address Resolution Protocol - Finds MAC from IP" },
    { term: "ICMP", definition: "Internet Control Message Protocol - Ping, error messages" },
    { term: "IPSec", definition: "IP Security - VPN encryption using AH and ESP" },
    { term: "Well-Known Ports", definition: "Ports 0-1023 reserved for standard services" },
    { term: "Encapsulation", definition: "Adding headers: Data → Segment → Packet → Frame → Bits" }
  ],

  gameType: 'port-matching',

  hands_on_exercise: "Open a command prompt and run 'netstat -ano' to see active connections. Identify: (1) Which ports your computer is using, (2) Which protocols (TCP/UDP) are active, (3) Which services correspond to the port numbers you see. Then, use 'nslookup google.com' to see DNS in action. Finally, release and renew your IP address using 'ipconfig /release' followed by 'ipconfig /renew' and observe the DHCP DORA process in action."
};

export default day2Module;
