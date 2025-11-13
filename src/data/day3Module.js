// DAY 3: TCP/IP Applications & Protocol Troubleshooting - COMPLETE MODULE

export const day3Module = {
  day: 3,
  module_title: "TCP/IP Applications & Protocol Troubleshooting",
  
  // CONVERSATIONAL CONTENT (Full Mode)
  lesson_content: `**Welcome to Day 3: Real-World TCP/IP Applications!**

Today we're taking all those protocols from Day 2 and putting them to work! We'll explore how applications actually USE these protocols, common troubleshooting scenarios, and protocol analysis. This is where theory meets practice!

**🔍 Understanding Application Layer Communication**

Remember, applications don't directly "speak" TCP/IP. They use APIs (Application Programming Interfaces) to communicate with the protocol stack. Think of it like this:

**Application** → "I need to send this data"
**API** → "Okay, I'll package it properly"
**Protocol Stack** → "Got it! I'll handle the delivery"

**📧 Email Systems - The Complete Picture**

Let's trace an email from start to finish:

**Sending Email:**
1. You compose an email in Outlook/Gmail
2. Client uses **SMTP (port 25 or 587)** to send to your mail server
3. Your mail server uses **SMTP** to relay to recipient's mail server
4. Recipient's server stores the message

**Receiving Email:**
Two options:
- **POP3 (port 110):** Downloads and typically deletes from server
  - Simple, fast
  - Email stored locally
  - Not ideal for multiple devices

- **IMAP (port 143):** Syncs with server
  - Email stays on server
  - Works across multiple devices
  - Can organize in folders
  - Search capabilities

**Modern Email Security:**
Always use encrypted versions:
- **SMTPS (port 587):** Encrypted email sending
- **POP3S (port 995):** Encrypted POP3
- **IMAPS (port 993):** Encrypted IMAP

**Email Troubleshooting Scenarios:**

**Scenario 1:** Can't send email but can receive
**Likely Issue:** SMTP settings incorrect or port 25 blocked
**Check:** 
- SMTP server address
- Port number (try 587 instead of 25)
- Authentication credentials
- Firewall rules

**Scenario 2:** Can receive on one device but not another
**Likely Issue:** POP3 downloading and deleting messages
**Solution:** Switch to IMAP or configure POP3 to leave messages on server

**Scenario 3:** Email works internally but not externally
**Likely Issue:** DNS MX records or mail relay settings
**Check:**
- MX (Mail Exchange) records in DNS
- SPF (Sender Policy Framework) records
- Mail server's ability to relay

**🌐 Web Communication - HTTP/HTTPS Deep Dive**

**HTTP Request/Response Cycle:**

1. **DNS Lookup**
   - Browser: "What's the IP for www.google.com?"
   - DNS Server: "It's 142.250.80.46"

2. **TCP Three-Way Handshake**
   - SYN → SYN-ACK → ACK
   - Connection established on port 80 (HTTP) or 443 (HTTPS)

3. **HTTP Request**
   ```
   GET /index.html HTTP/1.1
   Host: www.example.com
   User-Agent: Mozilla/5.0
   Accept: text/html
   ```

4. **HTTP Response**
   ```
   HTTP/1.1 200 OK
   Content-Type: text/html
   Content-Length: 1234
   
   <html>...</html>
   ```

5. **Connection Close**
   - FIN → FIN-ACK → ACK (TCP teardown)

**HTTP Status Codes You Need to Know:**

**2xx - Success:**
- **200 OK** - Request successful
- **201 Created** - Resource created successfully

**3xx - Redirection:**
- **301 Moved Permanently** - Resource has new permanent location
- **302 Found** - Temporary redirect
- **304 Not Modified** - Cached version is still valid

**4xx - Client Errors:**
- **400 Bad Request** - Malformed request syntax
- **401 Unauthorized** - Authentication required
- **403 Forbidden** - Server refuses to fulfill request
- **404 Not Found** - Resource doesn't exist
- **408 Request Timeout** - Server timed out waiting for request

**5xx - Server Errors:**
- **500 Internal Server Error** - Generic server error
- **502 Bad Gateway** - Invalid response from upstream server
- **503 Service Unavailable** - Server temporarily unavailable
- **504 Gateway Timeout** - Gateway didn't receive timely response

**HTTPS/TLS Handshake Process:**

1. **Client Hello**
   - Client sends supported TLS versions and cipher suites
   - Random number for key generation

2. **Server Hello**
   - Server chooses TLS version and cipher suite
   - Sends digital certificate
   - Server's random number

3. **Certificate Verification**
   - Client verifies certificate with Certificate Authority (CA)
   - Checks domain name matches
   - Verifies certificate hasn't expired

4. **Key Exchange**
   - Client generates pre-master secret
   - Encrypts with server's public key
   - Both sides derive session keys

5. **Finished Messages**
   - Both sides send encrypted "finished" messages
   - Secure communication begins!

**🗂️ File Transfer Protocols - Choosing the Right Tool**

**FTP (File Transfer Protocol) - Ports 20/21:**

**Pros:**
- Widely supported
- Can transfer large files
- Supports resume capability
- Active and passive modes

**Cons:**
- NO ENCRYPTION! (Never use for sensitive data)
- Username and password sent in clear text
- Vulnerable to packet sniffing
- Many firewalls block it

**FTP Modes:**

**Active Mode:**
- Client opens random port and tells server
- Server initiates data connection from port 20
- Problem: Client firewalls often block incoming connections

**Passive Mode:**
- Client initiates both control and data connections
- Server opens random port for data
- Better for clients behind firewalls

**SFTP (SSH File Transfer Protocol) - Port 22:**

**The Modern Choice:**
✅ Encrypted connection
✅ Single port (22) - firewall friendly
✅ Integrated with SSH authentication
✅ Supports public key authentication
✅ Can resume transfers
✅ Directory browsing and manipulation

**TFTP (Trivial File Transfer Protocol) - Port 69:**

**Characteristics:**
- Uses UDP (fast, unreliable)
- No authentication
- No encryption
- No directory browsing
- Maximum file size limitations

**When to Use TFTP:**
- Network device boot images
- Router/switch configuration backups
- PXE (Preboot Execution Environment) booting
- Simple, controlled environments

**Never Use TFTP For:**
- Sensitive data
- Over the Internet
- User file transfers
- Anything requiring security

**🔐 Remote Access Protocols**

**SSH (Secure Shell) - Port 22:**

**What SSH Provides:**
✅ Encrypted remote command-line access
✅ Encrypted file transfers (SFTP, SCP)
✅ Port forwarding/tunneling
✅ X11 forwarding (GUI applications)
✅ Key-based authentication

**SSH Authentication Methods:**

1. **Password Authentication:**
   - Simple but less secure
   - Vulnerable to brute force attacks
   - Should require strong passwords

2. **Public Key Authentication:**
   - Much more secure
   - Private key stays on your computer
   - Public key goes on server
   - Server verifies you have matching private key

**SSH Key Generation:**
```
ssh-keygen -t rsa -b 4096
```
Creates:
- Private key (keep secret!)
- Public key (distribute to servers)

**Common SSH Commands:**
```
ssh user@hostname                    # Connect to remote host
ssh -p 2222 user@hostname           # Connect on different port
scp file.txt user@host:/path        # Secure copy
ssh -L 8080:localhost:80 user@host  # Port forwarding
```

**RDP (Remote Desktop Protocol) - Port 3389:**

**Windows Remote Access:**
- Full graphical desktop
- Supports audio and video
- Clipboard sharing
- Drive redirection
- Printer mapping

**Security Best Practices:**
✅ Use Network Level Authentication (NLA)
✅ Don't expose directly to Internet
✅ Use VPN for external access
✅ Require strong passwords
✅ Enable account lockout policies
✅ Use non-standard port (security through obscurity)

**Telnet - Port 23:**

**⚠️ NEVER USE TELNET FOR PRODUCTION! ⚠️**

Why Telnet is Dangerous:
❌ NO encryption
❌ Passwords sent in clear text
❌ Session completely visible
❌ Trivial to intercept

**Only Acceptable Use:**
- Testing if a port is open: `telnet hostname 80`
- Troubleshooting in isolated lab environments
- That's it!

**🌍 DNS - The Internet's Phone Book**

**DNS Record Types:**

**A Record:**
- Maps hostname to IPv4 address
- www.example.com → 192.0.2.1

**AAAA Record:**
- Maps hostname to IPv6 address
- www.example.com → 2001:db8::1

**CNAME Record:**
- Alias for another domain
- blog.example.com → www.example.com

**MX Record:**
- Mail exchange servers
- Specifies where email should be delivered
- Has priority numbers (lower = higher priority)

**PTR Record:**
- Reverse DNS lookup
- IP address → hostname
- 192.0.2.1 → www.example.com

**NS Record:**
- Nameserver records
- Specifies authoritative DNS servers for domain

**TXT Record:**
- Text information
- Used for SPF, DKIM, domain verification

**DNS Query Process:**

1. **Check Local Cache:**
   - Computer: "Do I already know this?"
   - If yes, use cached answer

2. **Check Hosts File:**
   - Windows: C:\Windows\System32\drivers\etc\hosts
   - Linux/Mac: /etc/hosts
   - Manual IP-to-hostname mappings

3. **Query Recursive DNS Server:**
   - Usually your ISP or configured DNS (8.8.8.8, 1.1.1.1)
   - Server checks its cache

4. **Root Server Query:**
   - If not cached, query root DNS servers
   - Root servers know where .com, .org, etc. servers are

5. **TLD Server Query:**
   - Query Top-Level Domain server (.com, .net)
   - TLD knows where example.com's nameservers are

6. **Authoritative Server Query:**
   - Query example.com's actual nameserver
   - Get the definitive answer

7. **Cache the Result:**
   - Store answer for TTL (Time To Live) period
   - Future queries are faster

**DNS Troubleshooting:**

**Problem:** Can ping IP addresses but not domain names
**Diagnosis:** DNS failure
**Commands to Use:**
```
nslookup google.com          # Check DNS resolution
ipconfig /displaydns         # View DNS cache (Windows)
ipconfig /flushdns          # Clear DNS cache (Windows)
```

**Problem:** DNS resolves but to wrong IP
**Possible Causes:**
- Incorrect DNS server configured
- DNS cache poisoning
- Outdated DNS cache
- Hosts file entry overriding

**🎯 DHCP - Automatic IP Configuration**

**DHCP Scope Configuration:**

What a DHCP server needs to know:
1. **IP Address Range:**
   - Start IP: 192.168.1.100
   - End IP: 192.168.1.200
   - Defines available addresses

2. **Subnet Mask:**
   - Defines network size
   - Example: 255.255.255.0

3. **Default Gateway:**
   - Router IP address
   - Example: 192.168.1.1

4. **DNS Servers:**
   - Primary: 8.8.8.8
   - Secondary: 8.8.4.4

5. **Lease Duration:**
   - How long client can use IP
   - Typical: 8 hours to 8 days

6. **Exclusions:**
   - Reserved IPs not to assign
   - Servers, printers, network devices

7. **Reservations:**
   - Specific MAC gets specific IP
   - Consistent IP for servers

**DHCP Lease Renewal:**

Clients don't just get an IP and forget about it!

**50% of Lease Time:**
- Client tries to renew with same server
- Sends DHCP Request directly to server

**87.5% of Lease Time:**
- If renewal failed, broadcast for any DHCP server
- Sends DHCP Discover

**100% of Lease Time:**
- Lease expires
- Must start DORA process from beginning
- Or use APIPA (169.254.x.x)

**DHCP Troubleshooting:**

**Problem:** Client gets 169.254.x.x address
**Meaning:** APIPA self-assigned (DHCP failed)
**Check:**
- Is DHCP server running?
- Network connectivity to DHCP server?
- DHCP scope has available addresses?
- IP helper/DHCP relay configured? (different subnet)

**Problem:** Client gets wrong subnet information
**Check:**
- Multiple DHCP servers on network (rogue DHCP)?
- Scope options configured correctly?
- Client on correct VLAN?

**🔧 Network Management - SNMP**

**SNMP Components:**

**Management Station (NMS):**
- Monitors network devices
- Collects statistics
- Receives alerts (traps)
- Controls devices (SET commands)

**SNMP Agent:**
- Software on managed devices
- Responds to queries
- Sends traps when issues occur
- Maintains MIB data

**Management Information Base (MIB):**
- Database of what can be monitored
- Standardized information structure
- OIDs (Object Identifiers) for each metric

**SNMP Operations:**

**GET:**
- Request specific information
- "What's your CPU utilization?"

**GET-NEXT:**
- Retrieve next object in MIB tree
- Walk through MIB structure

**GET-BULK:**
- Retrieve multiple objects efficiently
- SNMPv2 and later

**SET:**
- Change device configuration
- "Set interface to down"

**TRAP:**
- Asynchronous alert from device
- "Interface went down!"
- "Temperature critical!"
- "Power supply failed!"

**SNMP Versions:**

**SNMPv1:**
- Original version
- Community strings (password)
- NO encryption
- Sent in clear text!

**SNMPv2c:**
- Added GETBULK operation
- Still uses community strings
- Still no encryption
- Performance improvements

**SNMPv3:**
- Authentication
- Encryption
- Message integrity
- User-based security
- **Use this version!**

**📊 Syslog - Centralized Logging**

**Why Centralized Logging?**

✅ Single location for all logs
✅ Easier to search and correlate
✅ Survives device reboots
✅ Can't be tampered with locally
✅ Long-term storage
✅ Compliance requirements

**Syslog Severity Levels (0-7):**

**0 - Emergency:** System unusable
- "Power system total failure"
- "Core dump"

**1 - Alert:** Immediate action needed
- "Database unavailable"
- "Temperature critical"

**2 - Critical:** Critical conditions
- "Hard drive failure"
- "Fan failure"

**3 - Error:** Error conditions
- "Authentication failed"
- "Interface down"

**4 - Warning:** Warning conditions
- "High CPU utilization"
- "Memory low"

**5 - Notice:** Normal but significant
- "User logged in"
- "Configuration changed"

**6 - Informational:** Informational messages
- "Interface up"
- "Connection established"

**7 - Debug:** Debug messages
- Detailed technical info
- Only when troubleshooting

**Syslog Configuration:**

**On Network Devices:**
```
logging host 192.168.1.10
logging trap 4
logging facility local7
```

**Best Practices:**
✅ Use appropriate severity levels
✅ Include timestamps
✅ Configure NTP for time sync
✅ Monitor syslog server disk space
✅ Set up log rotation
✅ Create alerts for critical messages

**🔍 Protocol Analysis with Wireshark**

**Common Filters:**

**Display Filters:**
```
http                    # HTTP traffic only
tcp.port == 80         # Traffic on port 80
ip.addr == 192.168.1.1 # Specific IP address
dns                    # DNS queries/responses
icmp                   # Ping traffic
tcp.flags.syn == 1     # TCP SYN packets (new connections)
```

**Capture Filters:**
```
port 80                # Capture port 80 only
host 192.168.1.1      # Specific host
net 192.168.1.0/24    # Entire subnet
```

**What to Look For:**

**TCP Analysis:**
- Three-way handshake (SYN, SYN-ACK, ACK)
- Duplicate ACKs (possible packet loss)
- Retransmissions (network issues)
- Connection termination (FIN packets)

**HTTP Analysis:**
- Request methods (GET, POST)
- Response codes (200, 404, 500)
- User-Agent strings
- Cookies and authentication

**DNS Analysis:**
- Query and response times
- NXDOMAIN (domain doesn't exist)
- Multiple queries (DNS failure?)

**Common Issues to Diagnose:**

**High Latency:**
- Look at Time column
- TCP retransmissions
- Slow responses

**Connection Failures:**
- SYN packets without SYN-ACK
- RST (reset) packets
- ICMP Destination Unreachable

**Application Issues:**
- HTTP 5xx errors
- Long gaps between packets
- Incomplete TCP streams

**🎯 Real-World Troubleshooting Scenarios**

**Scenario 1: "Internet is slow"**

**Methodical Approach:**
1. **Ping default gateway:**
   - Latency > 50ms = local network issue
   
2. **Ping external IP (8.8.8.8):**
   - Tests Internet connectivity
   
3. **NSLookup test:**
   - Tests DNS performance
   
4. **Traceroute:**
   - Identifies where delays occur
   
5. **Check bandwidth:**
   - Speed test
   - Check for heavy users

**Scenario 2: "Can't access SharePoint"**

**Step-by-Step Diagnosis:**
1. Can you ping SharePoint server?
   - No = network/routing issue
   
2. Can you resolve SharePoint hostname?
   - nslookup sharepoint.company.com
   
3. Can you telnet to port 443?
   - telnet sharepoint.company.com 443
   
4. Check browser settings:
   - Proxy configuration
   - Certificate errors
   
5. Check SharePoint logs:
   - Authentication failures?
   - Permission issues?

**Scenario 3: "Email not working"**

**Troubleshooting Path:**
1. **Outbound (SMTP):**
   - Can you telnet to SMTP server port 25/587?
   - Authentication working?
   - Check SMTP server logs
   
2. **Inbound (POP3/IMAP):**
   - Can you telnet to mail server port 110/143?
   - Credentials correct?
   - Firewall blocking?
   
3. **DNS:**
   - MX records correct?
   - SPF records configured?

**Study Tips for Day 3:**

1. **Practice with real tools:**
   - Use Wireshark to capture your own traffic
   - Test SSH connections
   - Configure DHCP on a home router

2. **Memorize common troubleshooting commands:**
   - ping, traceroute, nslookup, telnet
   - ipconfig, netstat

3. **Understand the protocols holistically:**
   - Don't just memorize port numbers
   - Understand WHY protocols work the way they do

4. **Practice troubleshooting methodology:**
   - Always work layer by layer (OSI model)
   - Start at Physical layer, work up

5. **Security awareness:**
   - Always choose encrypted versions
   - Understand attack vectors

**Key Takeaways:**

✅ Applications use APIs to communicate with protocols
✅ Always use encrypted versions (HTTPS, SFTP, SSH, SMTPS)
✅ DNS is critical - many issues are DNS issues
✅ DHCP automates IP configuration with DORA process
✅ SNMP monitors networks, Syslog centralizes logs
✅ Protocol analysis helps diagnose problems
✅ Systematic troubleshooting beats random guessing

You're now equipped to troubleshoot real-world TCP/IP applications! 🚀`,

  // TEXTBOOK CONTENT (Formal Academic Style) - PLACEHOLDER
  lesson_textbook: `**[TEXTBOOK CONTENT PLACEHOLDER]**

This section is reserved for formal academic textbook content covering TCP/IP Applications and Protocol Troubleshooting.

**Topics to be covered:**
• Application Layer Protocol Implementation
• Email Systems Architecture (SMTP, POP3, IMAP)
• HTTP/HTTPS Communication Mechanisms
• File Transfer Protocol Implementations
• Remote Access Protocols and Security
• DNS Resolution Process and Record Types
• DHCP Scope Management and Lease Process
• Network Management with SNMP
• Centralized Logging with Syslog
• Protocol Analysis Methodologies
• Systematic Troubleshooting Procedures
• Common Application Layer Issues and Solutions

**Format will include:**
- Formal definitions and terminology
- Detailed technical specifications
- RFC references
- Comprehensive diagrams
- Industry standards
- Best practices documentation
- Case studies
- Advanced configuration examples

**Paste your textbook content here, following the formal academic structure seen in Day 1 and Day 2 modules.**`,

  // SUMMARY CONTENT
  lesson_summary: `**Quick Summary: TCP/IP Applications & Troubleshooting**

**Email Protocols:**
• SMTP (25/587) - Send email
• POP3 (110) - Download email, delete from server
• IMAP (143) - Sync email, stays on server
• Use encrypted: SMTPS (587), POP3S (995), IMAPS (993)

**Web Protocols:**
• HTTP (80) - Insecure web
• HTTPS (443) - Secure web with TLS/SSL

**HTTP Status Codes:**
• 2xx = Success (200 OK)
• 3xx = Redirect (301, 302)
• 4xx = Client error (404 Not Found)
• 5xx = Server error (500, 503)

**File Transfer:**
• FTP (20/21) - Insecure, never use for sensitive data
• SFTP (22) - Secure, encrypted, modern choice
• TFTP (69) - Simple, no auth, UDP, for device configs only

**Remote Access:**
• SSH (22) - Encrypted command line, key-based auth
• RDP (3389) - Windows remote desktop
• Telnet (23) - NEVER USE! No encryption

**DNS Record Types:**
• A - IPv4 address
• AAAA - IPv6 address
• CNAME - Alias
• MX - Mail server
• PTR - Reverse lookup
• NS - Nameserver
• TXT - Text info (SPF, DKIM)

**DNS Query Process:**
Local cache → Hosts file → Recursive DNS → Root → TLD → Authoritative

**DHCP Process:**
DORA: Discover → Offer → Request → Acknowledge

**DHCP Scope Includes:**
• IP range
• Subnet mask
• Default gateway
• DNS servers
• Lease duration
• Reservations/exclusions

**SNMP:**
• SNMPv1/v2c - Insecure, community strings
• SNMPv3 - Encrypted, use this!
• Operations: GET, SET, TRAP
• Ports: 161 (queries), 162 (traps)

**Syslog Severity (0-7):**
0-Emergency, 1-Alert, 2-Critical, 3-Error, 4-Warning, 5-Notice, 6-Info, 7-Debug

**Troubleshooting Commands:**
• ping - Test connectivity
• traceroute - Show path
• nslookup - DNS lookup
• ipconfig /flushdns - Clear DNS cache
• telnet host port - Test port
• netstat - Show connections

**Troubleshooting Methodology:**
1. Check Physical layer (cables, lights)
2. Check Data Link (MAC, switch)
3. Check Network (IP, ping gateway)
4. Check Transport (ports, firewall)
5. Check Application (settings, logs)

**Common Issues:**
• 169.254.x.x = DHCP failed (APIPA)
• Can ping IP not name = DNS problem
• Can't send email = SMTP issue
• Can't receive = POP3/IMAP issue

**Security Rule:**
Always use encrypted protocols: FTP→SFTP, Telnet→SSH, HTTP→HTTPS`,

  // QUIZ QUESTIONS
  quiz_questions: [
    {
      question: "Which protocol should you use for secure file transfers?",
      options: ["FTP", "TFTP", "SFTP", "Telnet"],
      correct_answer: "SFTP"
    },
    {
      question: "What does an HTTP 404 status code indicate?",
      options: ["Server error", "Resource not found", "Request successful", "Authentication required"],
      correct_answer: "Resource not found"
    },
    {
      question: "Which email protocol keeps messages on the server and supports folders?",
      options: ["SMTP", "POP3", "IMAP", "HTTP"],
      correct_answer: "IMAP"
    },
    {
      question: "What is the first step in the DHCP DORA process?",
      options: ["Offer", "Request", "Acknowledge", "Discover"],
      correct_answer: "Discover"
    },
    {
      question: "Which DNS record type maps a hostname to an IPv4 address?",
      options: ["AAAA", "CNAME", "A", "MX"],
      correct_answer: "A"
    },
    {
      question: "What IP address range indicates DHCP failure (APIPA)?",
      options: ["192.168.x.x", "10.x.x.x", "169.254.x.x", "172.16.x.x"],
      correct_answer: "169.254.x.x"
    },
    {
      question: "Which SNMP version provides encryption and authentication?",
      options: ["SNMPv1", "SNMPv2c", "SNMPv3", "SNMP"],
      correct_answer: "SNMPv3"
    },
    {
      question: "What port does secure SMTP (SMTPS) typically use?",
      options: ["25", "110", "587", "993"],
      correct_answer: "587"
    },
    {
      question: "Why should you never use Telnet for production systems?",
      options: ["It's too slow", "No encryption - passwords sent in clear text", "It only works on Windows", "It requires special hardware"],
      correct_answer: "No encryption - passwords sent in clear text"
    },
    {
      question: "What is the most severe syslog level?",
      options: ["0 - Emergency", "3 - Error", "7 - Debug", "4 - Warning"],
      correct_answer: "0 - Emergency"
    },
    {
      question: "Which protocol uses both port 161 and 162?",
      options: ["FTP", "SNMP", "DNS", "DHCP"],
      correct_answer: "SNMP"
    },
    {
      question: "What does an HTTP 500 status code indicate?",
      options: ["Client error", "Redirect", "Server error", "Success"],
      correct_answer: "Server error"
    },
    {
      question: "Which command clears the DNS cache in Windows?",
      options: ["ipconfig /release", "ipconfig /flushdns", "nslookup", "tracert"],
      correct_answer: "ipconfig /flushdns"
    },
    {
      question: "What is the primary advantage of IMAP over POP3?",
      options: ["Faster download speeds", "Works with multiple devices and keeps email on server", "Uses less bandwidth", "More secure"],
      correct_answer: "Works with multiple devices and keeps email on server"
    },
    {
      question: "What does MX record stand for in DNS?",
      options: ["Maximum record", "Mail Exchange", "Multiplex", "Message Extension"],
      correct_answer: "Mail Exchange"
    }
  ],

  // FLASHCARDS
  flashcards: [
    { term: "HTTP 200", definition: "OK - Request successful" },
    { term: "HTTP 404", definition: "Not Found - Resource doesn't exist" },
    { term: "HTTP 500", definition: "Internal Server Error - Server problem" },
    { term: "SMTP (25/587)", definition: "Sends email - 587 for encrypted" },
    { term: "POP3 (110)", definition: "Downloads email, typically deletes from server" },
    { term: "IMAP (143)", definition: "Syncs email, keeps on server, folder support" },
    { term: "SFTP (22)", definition: "Secure File Transfer using SSH encryption" },
    { term: "FTP Active Mode", definition: "Server initiates data connection - firewall issues" },
    { term: "FTP Passive Mode", definition: "Client initiates both connections - firewall friendly" },
    { term: "TFTP (69)", definition: "Trivial FTP - UDP, no auth, device configs" },
    { term: "SSH (22)", definition: "Secure Shell - encrypted remote access" },
    { term: "RDP (3389)", definition: "Remote Desktop Protocol - Windows GUI access" },
    { term: "DNS A Record", definition: "Maps hostname to IPv4 address" },
    { term: "DNS AAAA Record", definition: "Maps hostname to IPv6 address" },
    { term: "DNS MX Record", definition: "Mail Exchange - specifies mail servers" },
    { term: "DNS CNAME", definition: "Canonical Name - alias for another domain" },
    { term: "DHCP DORA", definition: "Discover → Offer → Request → Acknowledge" },
    { term: "APIPA (169.254.x.x)", definition: "Auto-assigned when DHCP fails" },
    { term: "DHCP Lease", definition: "Time period client can use assigned IP" },
    { term: "SNMP GET", definition: "Request specific information from device" },
    { term: "SNMP TRAP", definition: "Asynchronous alert from device to management station" },
    { term: "SNMPv3", definition: "Encrypted SNMP with authentication - always use" },
    { term: "Syslog Level 0", definition: "Emergency - system unusable" },
    { term: "Syslog Level 3", definition: "Error - error conditions" },
    { term: "Syslog Level 6", definition: "Informational - normal information messages" },
    { term: "TLS/SSL", definition: "Encryption for HTTPS and secure protocols" }
  ],

  gameType: 'port-matching',

  hands_on_exercise: `Practical Lab Exercise:

1. **Email Testing:**
   - Configure an email client with both POP3 and IMAP
   - Send test emails and observe the differences
   - Try both encrypted and unencrypted connections (on test account only!)

2. **DNS Investigation:**
   - Run: nslookup google.com
   - Run: nslookup -type=MX google.com (see mail servers)
   - Run: nslookup -type=NS google.com (see nameservers)
   - Use ipconfig /displaydns to see your DNS cache
   - Clear it with ipconfig /flushdns and test again

3. **Protocol Analysis:**
   - Download Wireshark
   - Capture traffic while browsing to a website
   - Filter for: http, dns, tcp
   - Identify the three-way handshake
   - Find DNS queries and responses

4. **DHCP Testing:**
   - Run: ipconfig /all (note your current IP)
   - Run: ipconfig /release (you'll lose connectivity!)
   - Run: ipconfig /renew (watch DORA process)
   - Document the IP, subnet mask, gateway, and DNS servers you received

5. **Port Testing:**
   - Use telnet to test ports: telnet google.com 80
   - Try: telnet google.com 443
   - This verifies ports are open and reachable`
};

export default day3Module;
