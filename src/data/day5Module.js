// DAY 5: Dynamic/Static IP Configuration & DHCP - COMPLETE MODULE

export const day5Module = {
  day: 5,
  module_title: "Dynamic vs Static IP & DHCP Mastery",
  
  // CONVERSATIONAL CONTENT (Full Mode)
  lesson_content: `**Welcome to Day 5: IP Configuration Methods!**

Today we're diving deep into how devices actually GET their IP addresses! We'll explore static vs dynamic addressing, master DHCP configuration, and learn how to troubleshoot IP addressing issues like a pro!

**🔧 Static IP Addressing - The Manual Method**

**What is Static IP?**

Static IP addressing means YOU manually configure every IP parameter on each device:
- IP address
- Subnet mask
- Default gateway
- DNS servers
- Sometimes: WINS servers, domain name

**Advantages of Static IP:**

✅ **Predictable addresses**
- Always know where to find devices
- Easier for remote access

✅ **No dependency on DHCP server**
- Works even if DHCP server fails
- No network services required

✅ **Better for servers**
- DNS entries don't change
- Firewall rules stay consistent
- Easier to manage certificates

✅ **Slightly faster**
- No DORA process delay
- Instant network access on boot

**Disadvantages of Static IP:**

❌ **Time-consuming**
- Must configure each device manually
- 1000 devices = 1000 configurations!

❌ **Error-prone**
- Easy to make typos
- Duplicate IP conflicts
- Incorrect subnet masks

❌ **No automatic updates**
- Gateway change? Reconfigure all devices
- DNS change? Visit every device
- Network change? Major headache

❌ **Poor for mobile devices**
- Laptops moving between networks
- Different config for each location
- User frustration

**When to Use Static IP:**

✅ Servers (web, email, DNS, DHCP)
✅ Network devices (routers, switches, firewalls)
✅ Printers and copiers
✅ Security cameras
✅ VoIP phones (sometimes)
✅ Critical infrastructure

❌ NOT for regular workstations
❌ NOT for laptops
❌ NOT for mobile devices
❌ NOT for guest devices

**🌊 Dynamic IP Addressing - The Automatic Way**

**What is Dynamic IP (DHCP)?**

Dynamic Host Configuration Protocol (DHCP) automatically assigns IP configurations to devices. It's like a librarian handing out books - devices check out IP addresses for a specified time!

**Advantages of Dynamic IP:**

✅ **Zero touch deployment**
- Plug in device, get IP automatically
- No user configuration needed
- Perfect for non-technical users

✅ **Centralized management**
- Change gateway once, affects all clients
- Update DNS servers in one place
- Modify options from central location

✅ **Efficient IP utilization**
- IPs recycled when not in use
- Smaller address pools needed
- No wasted addresses

✅ **Reduced errors**
- No duplicate IP addresses
- Consistent configurations
- No user typos

✅ **Perfect for mobile devices**
- Automatic configuration anywhere
- Works across different networks
- Seamless roaming

**Disadvantages of Dynamic IP:**

❌ **Unpredictable addresses**
- Device IP may change
- Can't rely on specific IP

❌ **DHCP server dependency**
- Server down = no IPs assigned
- Single point of failure
- Requires DHCP server maintenance

❌ **Slight network overhead**
- DORA process uses bandwidth
- Lease renewals create traffic
- Not significant but measurable

**🎯 DHCP Deep Dive - How It Really Works**

**DHCP Components:**

**DHCP Server:**
- Maintains pool of available IP addresses
- Stores configuration information
- Tracks leases and renewals
- Responds to client requests

**DHCP Client:**
- Any device requesting IP configuration
- Broadcasts DISCOVER messages
- Receives and accepts offers
- Renews leases automatically

**DHCP Relay Agent (IP Helper):**
- Forwards DHCP broadcasts across routers
- Enables DHCP across subnets
- Critical for enterprise networks
- Configured on router interfaces

**📝 The DORA Process - Detailed Walkthrough**

Let's trace a device getting an IP address:

**Step 1: DISCOVER (Broadcast)**

Client boots up with no IP address:
```
Source IP:      0.0.0.0
Destination IP: 255.255.255.255 (broadcast)
Source MAC:     Client's MAC address
Dest MAC:       FF:FF:FF:FF:FF:FF (broadcast)
Message:        "I need an IP address! Anyone listening?"
```

The client broadcasts because it doesn't know:
- Its own IP (doesn't have one yet!)
- DHCP server IP
- Default gateway

**Step 2: OFFER (Unicast or Broadcast)**

DHCP server receives DISCOVER and responds:
```
Source IP:      DHCP Server IP
Destination IP: Offered IP or 255.255.255.255
Destination MAC: Client's MAC
Message:        "How about 192.168.1.100?"
Includes:
  - Offered IP address
  - Subnet mask
  - Lease duration
  - Server identifier
  - Gateway, DNS, etc.
```

If multiple DHCP servers exist, client may receive multiple offers!

**Step 3: REQUEST (Broadcast)**

Client accepts one offer (usually first received):
```
Source IP:      0.0.0.0 (still no IP!)
Destination IP: 255.255.255.255 (broadcast)
Message:        "I choose server X's offer of 192.168.1.100"
```

Why broadcast?
- To inform ALL DHCP servers which offer was accepted
- Rejected servers can return their offers to the pool

**Step 4: ACKNOWLEDGE (Unicast or Broadcast)**

Selected DHCP server confirms:
```
Source IP:      DHCP Server IP
Destination IP: Assigned IP
Message:        "192.168.1.100 is yours! Lease details attached."
```

Client now configures itself with:
- IP address: 192.168.1.100
- Subnet mask: 255.255.255.0
- Default gateway: 192.168.1.1
- DNS servers: 8.8.8.8, 8.8.4.4
- Lease time: 8 hours

**🔄 DHCP Lease Process - The Complete Lifecycle**

**Lease Acquisition:**
- Client gets IP through DORA
- Lease timer starts
- Example: 8-hour lease

**Lease Renewal (50% of lease time):**

At 4 hours (50% of 8 hours):
- Client sends DHCP REQUEST directly to server (unicast)
- No DISCOVER needed
- "Can I keep using this IP?"
- Server responds with ACK or NAK

**If renewal succeeds:**
- Lease timer resets
- Client keeps same IP
- Process repeats

**If renewal fails (87.5% of lease time):**

At 7 hours (87.5% of 8 hours):
- Client broadcasts DHCP REQUEST
- Any DHCP server can respond
- Tries to get ANY IP address
- Last chance before lease expires!

**Lease Expiration (100% of lease time):**

At 8 hours:
- If no response, lease expires
- Client must stop using IP
- Falls back to APIPA (169.254.x.x)
- Must start DORA from beginning

**Manual Release:**

Client can release IP early:
```
Windows: ipconfig /release
Linux:   dhclient -r
```

Sends DHCP RELEASE message to server:
- IP returned to pool immediately
- Available for other clients
- Client loses network connectivity

**🏗️ DHCP Scope Configuration**

**What is a Scope?**

A scope is a range of IP addresses that a DHCP server can assign, plus all configuration options.

**Scope Components:**

**1. IP Address Range:**
```
Start IP: 192.168.1.100
End IP:   192.168.1.200
Total:    101 addresses
```

**2. Subnet Mask:**
```
Subnet Mask: 255.255.255.0
CIDR:        /24
```

**3. Exclusions:**

IPs NOT to assign (reserved for static):
```
192.168.1.1   - Router
192.168.1.10  - Server
192.168.1.20  - Printer
```

Exclusions remove these from the pool.

**4. Reservations (Static Leases):**

Specific MAC gets specific IP:
```
MAC: 00:11:22:33:44:55 → IP: 192.168.1.150
```

Benefits:
- Consistent IP for device
- Centralized management
- Changes made on DHCP server only

**5. Lease Duration:**

How long client can use IP:
- Short (hours): High-turnover environments
  - Coffee shops
  - Conference centers
  - Guest networks

- Medium (days): Normal offices
  - Standard corporate networks
  - Schools

- Long (weeks): Stable environments
  - Server VLANs (shouldn't use DHCP!)
  - Static infrastructure

- Unlimited: Permanent assignment
  - Like static but managed via DHCP
  - Useful for printers

**6. Default Gateway (Option 3):**
```
Router IP: 192.168.1.1
```
Must be on same subnet!

**7. DNS Servers (Option 6):**
```
Primary DNS:   8.8.8.8
Secondary DNS: 8.8.4.4
Tertiary DNS:  1.1.1.1
```

Multiple for redundancy.

**8. WINS Servers (Option 44):**
```
WINS Server: 192.168.1.50
```
For legacy Windows NetBIOS name resolution.
Rarely used today.

**9. Domain Name (Option 15):**
```
Domain: company.local
```
Appended to hostnames for FQDN.

**10. NTP Server (Option 42):**
```
Time Server: 192.168.1.5
```
For clock synchronization.

**11. TFTP Server (Option 66):**
```
TFTP Server: 192.168.1.60
```
For network booting (PXE).

**📊 DHCP Server Types**

**Dedicated DHCP Server:**
- Windows Server with DHCP role
- Linux server running dhcpd
- Appliance or virtual machine
- Best for large networks

**Router-Based DHCP:**
- Most home/small office routers
- Simple configuration
- Limited scope options
- Perfect for small networks
- Example: Home WiFi router

**Failover DHCP:**
- Multiple DHCP servers
- Load balancing or hot standby
- Prevents single point of failure
- Critical for enterprise

**DHCP Relay/IP Helper:**

**The Problem:**
DHCP uses broadcasts, which don't cross routers.

**The Solution:**
Configure router to relay DHCP:
```
interface GigabitEthernet0/1
 ip helper-address 192.168.10.5
```

**How it works:**
1. Client broadcasts DISCOVER
2. Router intercepts broadcast
3. Router forwards as UNICAST to DHCP server
4. Server responds through router
5. Router delivers to client

**Benefits:**
- Centralized DHCP for multiple subnets
- One DHCP server for entire building
- Reduces server count
- Easier management

**🔍 DHCP Troubleshooting - Common Issues**

**Problem 1: Client Gets APIPA Address (169.254.x.x)**

**Symptoms:**
- IP address starts with 169.254
- No network connectivity beyond local link
- Can't reach gateway or Internet

**Causes:**
1. No DHCP server available
2. DHCP server down/offline
3. All IP addresses exhausted
4. Network cable unplugged
5. Wrong VLAN
6. IP helper not configured (different subnet)

**Troubleshooting Steps:**
```
1. Check cable connection - lights on NIC?
2. Check if DHCP server is running
3. Ping DHCP server (if on same subnet)
4. Check DHCP scope has available IPs
5. Check switch port VLAN assignment
6. Verify IP helper configuration (if different subnet)
7. Check DHCP server logs
```

**Commands:**
```
Windows:
  ipconfig /all           - Check current config
  ipconfig /release       - Release current IP
  ipconfig /renew        - Request new IP
  
Linux:
  ip addr                 - Check current config
  sudo dhclient -r       - Release current IP
  sudo dhclient          - Request new IP
```

**Problem 2: Wrong IP Subnet**

**Symptoms:**
- Gets IP but wrong subnet
- Can't reach gateway
- Can't reach Internet

**Causes:**
1. Multiple DHCP servers (rogue DHCP)
2. Wrong scope activated
3. Client on wrong VLAN

**Solution:**
- Identify rogue DHCP servers
- Use DHCP snooping on switches
- Verify VLAN assignment
- Check which DHCP server responded

**Problem 3: Short Lease Times Causing Disruptions**

**Symptoms:**
- Frequent network disconnections
- IP address changes during work
- VoIP calls dropping

**Causes:**
- Lease duration too short
- DHCP server unreachable during renewal

**Solution:**
- Increase lease duration
- Ensure DHCP server reliability
- Consider reservations for critical devices

**Problem 4: Exhausted Address Pool**

**Symptoms:**
- New devices can't get IPs
- DHCP server shows 0 available addresses
- Some devices work, others don't

**Causes:**
- Too many devices for scope size
- Stale leases not expiring
- Devices not releasing IPs properly

**Solution:**
- Expand IP address range
- Reduce lease time
- Clear stale leases
- Force lease cleanup

**Problem 5: Duplicate IP Address Conflict**

**Symptoms:**
- "IP address conflict" error message
- Intermittent network connectivity
- Strange network behavior

**Causes:**
- Static IP overlaps with DHCP range
- DHCP server not checking for conflicts
- Multiple DHCP servers

**Solution:**
- Separate static IPs from DHCP pool
- Use DHCP reservations instead of static
- Enable conflict detection on DHCP server
- Eliminate rogue DHCP servers

**🛡️ DHCP Security Concerns**

**Rogue DHCP Servers:**

**The Threat:**
Attacker sets up unauthorized DHCP server:
- Assigns wrong gateway (man-in-the-middle)
- Assigns malicious DNS servers
- Assigns IPs from wrong subnet
- Causes denial of service

**Protection:**
- **DHCP Snooping** on switches
  - Only authorized ports can offer DHCP
  - Blocks rogue DHCP servers
  - Builds trusted DHCP server database

**DHCP Starvation Attack:**

**The Attack:**
Attacker requests all available IPs:
- Exhausts DHCP pool
- Legitimate users can't get IPs
- Denial of service

**Protection:**
- Limit number of MACs per switch port
- Port security on switches
- Monitor DHCP server logs
- Alert on unusual lease patterns

**DHCP Spoofing:**

**The Attack:**
Attacker pretends to be DHCP server:
- Intercepts DISCOVER messages
- Responds with malicious configuration

**Protection:**
- DHCP Snooping
- 802.1X authentication
- Network Access Control (NAC)

**📱 Special DHCP Scenarios**

**VoIP Phones:**

VoIP phones need special DHCP options:
```
Option 150: TFTP server (for configs)
Option 66:  Boot server
Option 43:  Vendor-specific info
```

Separate VLAN for voice traffic:
- Voice VLAN (VVLAN)
- Different DHCP scope
- QoS priority
- Security isolation

**PXE Boot (Network Booting):**

Computers boot from network:
```
Option 66: Boot server name
Option 67: Boot file name
```

Used for:
- Diskless workstations
- Operating system deployment
- Thin clients
- Mass imaging

**Wireless Networks:**

Special considerations:
- Fast roaming between APs
- Short lease times (30 min to 2 hours)
- Large pool for guests
- Captive portal integration

**Guest Networks:**

Best practices:
- Separate VLAN
- Separate DHCP scope
- Isolated from corporate network
- Short lease times (1-4 hours)
- No access to internal resources

**🔧 Advanced DHCP Concepts**

**DHCP Failover:**

**Load Balancing:**
Two DHCP servers share scope:
- 50% of IPs on Server A
- 50% of IPs on Server B
- Both servers active
- Balanced client load

**Hot Standby:**
One active, one backup:
- Primary handles all requests
- Secondary only if primary fails
- Slower but simpler

**Split Scope:**
Manual load balancing:
- Different ranges on each server
- No automatic synchronization
- Must manually coordinate

**DHCP Option 82 (Relay Agent Information):**

Adds switch port info to DHCP request:
- Which switch
- Which port
- Which VLAN

Benefits:
- Track device locations
- Assign IPs based on location
- Enforce policies by location

**DHCPv6 - DHCP for IPv6:**

Two modes:

**Stateless (SLAAC):**
- Router provides prefix
- Device creates its own address
- DHCPv6 provides DNS, domain only
- Lightweight

**Stateful:**
- Full DHCP like IPv4
- Server assigns complete address
- Server tracks all assignments
- More control

**🎓 Best Practices for IP Configuration**

**For Small Networks (< 50 devices):**
✅ Use router-based DHCP
✅ Simple configuration
✅ Single scope
✅ Manual reservations for printers

**For Medium Networks (50-500 devices):**
✅ Dedicated DHCP server
✅ Multiple scopes per site
✅ 8-hour lease time
✅ DHCP reservations for infrastructure
✅ IP helper on routers
✅ DHCP snooping enabled

**For Large Networks (500+ devices):**
✅ Redundant DHCP servers
✅ Failover configuration
✅ Multiple scopes per building
✅ 4-8 hour lease time
✅ Separate scopes for VoIP
✅ Separate scopes for guests
✅ DHCP snooping and 802.1X
✅ Centralized management
✅ Monitoring and alerting

**Documentation:**
Always document:
- DHCP server IPs
- Scope ranges
- Exclusions and why
- Reservations and MAC addresses
- Lease times
- Special options configured

**Key Takeaways:**

✅ Static IP for servers and infrastructure
✅ Dynamic IP for workstations and mobile devices
✅ DHCP DORA: Discover → Offer → Request → Acknowledge
✅ Lease renewal at 50% and 87.5% of lease time
✅ APIPA (169.254.x.x) means DHCP failed
✅ Use reservations instead of static when possible
✅ DHCP snooping prevents rogue servers
✅ Separate DHCP scopes for different device types
✅ IP helper enables DHCP across subnets
✅ Monitor DHCP servers for availability and capacity

You're now a DHCP master! 🎓`,

  // TEXTBOOK CONTENT (Formal Academic Style) - PLACEHOLDER
  lesson_textbook: `**[TEXTBOOK CONTENT PLACEHOLDER]**

This section is reserved for formal academic textbook content covering Dynamic vs Static IP Configuration and DHCP.

**Topics to be covered:**
• Static IP Address Configuration Methodology
• Dynamic Host Configuration Protocol (DHCP) Architecture
• DHCP Message Format and Packet Structure
• DORA Process (Discover, Offer, Request, Acknowledge)
• DHCP Lease Lifecycle Management
• DHCP Scope Design and Configuration
• DHCP Options and Parameters (RFC 2132)
• DHCP Relay Agents and IP Helper Addresses
• DHCP Failover and High Availability
• DHCPv6 for IPv6 Networks
• DHCP Security Considerations
• Troubleshooting DHCP Issues
• APIPA (Automatic Private IP Addressing)
• Best Practices for IP Address Management

**Format will include:**
- Formal definitions and terminology
- RFC references (RFC 2131, RFC 2132)
- Detailed protocol specifications
- Message sequence diagrams
- Configuration examples
- Network design principles
- Security considerations
- Case studies
- Troubleshooting methodologies

**Paste your textbook content here, following the formal academic structure seen in Day 1 and Day 2 modules.**`,

  // SUMMARY CONTENT
  lesson_summary: `**Quick Summary: Dynamic vs Static IP & DHCP**

**Static IP:**
• Manually configured on each device
• Predictable, consistent addresses
• Best for: servers, network devices, printers
• Disadvantages: time-consuming, error-prone

**Dynamic IP (DHCP):**
• Automatically assigned by DHCP server
• Zero-touch configuration
• Best for: workstations, laptops, mobile devices
• Disadvantages: requires DHCP server

**DHCP DORA Process:**
1. **D**iscover - Client broadcasts "need IP"
2. **O**ffer - Server offers IP configuration
3. **R**equest - Client requests offered IP
4. **A**cknowledge - Server confirms assignment

**DHCP Lease Lifecycle:**
• Acquisition - Get IP via DORA
• 50% - Try renew with same server (unicast)
• 87.5% - Broadcast for any server
• 100% - Lease expires, use APIPA

**DHCP Scope Components:**
• IP address range (start/end)
• Subnet mask
• Exclusions (reserved IPs)
• Reservations (MAC → specific IP)
• Lease duration
• Default gateway (Option 3)
• DNS servers (Option 6)
• Domain name (Option 15)

**Common DHCP Options:**
• Option 3 - Default gateway
• Option 6 - DNS servers
• Option 15 - Domain name
• Option 42 - NTP servers
• Option 66 - TFTP server
• Option 150 - TFTP server (VoIP)

**APIPA (169.254.x.x):**
• Auto-assigned when DHCP fails
• Link-local only
• Indicates DHCP problem

**Troubleshooting Commands:**
Windows:
• ipconfig /all - View configuration
• ipconfig /release - Release IP
• ipconfig /renew - Get new IP
• ipconfig /displaydns - Show DNS cache

Linux:
• ip addr - View configuration
• dhclient -r - Release IP
• dhclient - Get new IP

**Common Issues:**
• 169.254.x.x = DHCP failed
• Wrong subnet = Rogue DHCP or wrong VLAN
• Duplicate IP = Static overlaps DHCP range
• Exhausted pool = Too many devices or short lease

**Security:**
• DHCP Snooping - Blocks rogue DHCP servers
• Port security - Limits MACs per port
• 802.1X - Authentication before network access

**Best Practices:**
✅ Static for infrastructure
✅ Dynamic for end users
✅ Use reservations not static when possible
✅ Separate scopes for different device types
✅ Configure IP helper for multiple subnets
✅ Enable DHCP snooping
✅ Monitor DHCP server capacity
✅ Document scope configurations

**Lease Time Recommendations:**
• Guests/high turnover: 1-4 hours
• Office workstations: 4-8 hours
• Stable environments: 1-7 days
• Infrastructure: Use reservations, 8+ days`,

  // QUIZ QUESTIONS
  quiz_questions: [
    {
      question: "What does the 'D' in DORA stand for?",
      options: ["Deliver", "Discover", "Download", "Deploy"],
      correct_answer: "Discover"
    },
    {
      question: "At what percentage of lease time does a DHCP client first attempt to renew its lease?",
      options: ["25%", "50%", "75%", "87.5%"],
      correct_answer: "50%"
    },
    {
      question: "What IP address range indicates DHCP failure?",
      options: ["10.x.x.x", "169.254.x.x", "192.168.x.x", "127.x.x.x"],
      correct_answer: "169.254.x.x"
    },
    {
      question: "Which DHCP message type is sent first by a client?",
      options: ["Offer", "Request", "Acknowledge", "Discover"],
      correct_answer: "Discover"
    },
    {
      question: "What is a DHCP reservation?",
      options: ["Saved DHCP configuration", "Specific MAC always gets specific IP", "Backup DHCP server", "Reserved IP range"],
      correct_answer: "Specific MAC always gets specific IP"
    },
    {
      question: "Which DHCP option provides the default gateway?",
      options: ["Option 3", "Option 6", "Option 15", "Option 66"],
      correct_answer: "Option 3"
    },
    {
      question: "What feature prevents rogue DHCP servers on a network?",
      options: ["DHCP relay", "DHCP snooping", "DHCP failover", "DHCP split scope"],
      correct_answer: "DHCP snooping"
    },
    {
      question: "What is the purpose of IP helper address?",
      options: ["Backup DHCP server", "Forward DHCP broadcasts across routers", "Assign static IPs", "Monitor DHCP traffic"],
      correct_answer: "Forward DHCP broadcasts across routers"
    },
    {
      question: "Which devices should typically use static IP addresses?",
      options: ["Laptops", "Smartphones", "Servers and printers", "Guest devices"],
      correct_answer: "Servers and printers"
    },
    {
      question: "What happens when a DHCP lease expires and cannot be renewed?",
      options: ["Device keeps using IP", "Device gets random IP", "Device assigns itself APIPA address", "Device shuts down network"],
      correct_answer: "Device assigns itself APIPA address"
    },
    {
      question: "Which DHCP option specifies DNS servers?",
      options: ["Option 3", "Option 6", "Option 42", "Option 66"],
      correct_answer: "Option 6"
    },
    {
      question: "What is DHCP scope exhaustion?",
      options: ["Server runs out of disk space", "No more IP addresses available to assign", "Lease time expires", "Network bandwidth full"],
      correct_answer: "No more IP addresses available to assign"
    },
    {
      question: "Why would you use DHCP reservations instead of static IP?",
      options: ["Faster network speed", "Centralized management while providing consistent IPs", "Better security", "Reduced network traffic"],
      correct_answer: "Centralized management while providing consistent IPs"
    },
    {
      question: "What does APIPA stand for?",
      options: ["Advanced Private IP Addressing", "Automatic Private IP Addressing", "Assigned Public IP Address", "Active Protocol IP Assignment"],
      correct_answer: "Automatic Private IP Addressing"
    },
    {
      question: "In a DHCP failover configuration, what is 'hot standby' mode?",
      options: ["Both servers share the load equally", "One active server, one backup only if primary fails", "Servers alternate daily", "Multiple servers provide different scopes"],
      correct_answer: "One active server, one backup only if primary fails"
    }
  ],

  // FLASHCARDS
  flashcards: [
    { term: "Static IP", definition: "Manually configured, predictable, best for servers/infrastructure" },
    { term: "Dynamic IP", definition: "Auto-assigned by DHCP, best for workstations/mobile devices" },
    { term: "DORA Process", definition: "Discover → Offer → Request → Acknowledge" },
    { term: "DHCP Discover", definition: "Client broadcasts 'I need an IP address'" },
    { term: "DHCP Offer", definition: "Server offers IP configuration to client" },
    { term: "DHCP Request", definition: "Client requests offered IP configuration" },
    { term: "DHCP Acknowledge", definition: "Server confirms IP assignment to client" },
    { term: "DHCP Lease", definition: "Time period client can use assigned IP address" },
    { term: "50% Lease Time", definition: "Client tries to renew with same server (unicast)" },
    { term: "87.5% Lease Time", definition: "Client broadcasts to any server for renewal" },
    { term: "APIPA", definition: "169.254.x.x - Auto-assigned when DHCP fails" },
    { term: "DHCP Scope", definition: "Range of IPs and configuration options server can assign" },
    { term: "DHCP Exclusion", definition: "IP addresses removed from scope (for static devices)" },
    { term: "DHCP Reservation", definition: "Specific MAC address gets specific IP always" },
    { term: "Option 3", definition: "DHCP option for default gateway" },
    { term: "Option 6", definition: "DHCP option for DNS servers" },
    { term: "Option 15", definition: "DHCP option for domain name" },
    { term: "IP Helper", definition: "Forwards DHCP broadcasts across routers" },
    { term: "DHCP Relay", definition: "Same as IP Helper - forwards DHCP requests" },
    { term: "DHCP Snooping", definition: "Switch feature that blocks rogue DHCP servers" },
    { term: "Rogue DHCP", definition: "Unauthorized DHCP server on network" },
    { term: "DHCP Failover", definition: "Multiple DHCP servers for redundancy" },
    { term: "Split Scope", definition: "Different IP ranges on different DHCP servers" },
    { term: "DHCPv6", definition: "DHCP for IPv6 networks - stateful or stateless" },
    { term: "ipconfig /release", definition: "Windows command to release DHCP lease" },
    { term: "ipconfig /renew", definition: "Windows command to request new DHCP lease" }
  ],

  gameType: null, // Could create DHCP sequence game

  hands_on_exercise: `DHCP Lab Exercises:

**Exercise 1: Configure Static IP**
On your computer:
1. Note your current IP configuration (ipconfig /all)
2. Change to static IP:
   - IP: 192.168.1.50
   - Mask: 255.255.255.0
   - Gateway: 192.168.1.1
   - DNS: 8.8.8.8
3. Test connectivity
4. Change back to DHCP
5. Verify automatic configuration

**Exercise 2: DHCP Release and Renew**
Windows:
1. Run: ipconfig /all (note current IP)
2. Run: ipconfig /release (lose network!)
3. Run: ipconfig /all (should show 0.0.0.0 or 169.254.x.x)
4. Run: ipconfig /renew (get new IP)
5. Run: ipconfig /all (note possibly new IP)

Linux:
1. Run: ip addr (note current IP)
2. Run: sudo dhclient -r
3. Run: ip addr (check status)
4. Run: sudo dhclient
5. Run: ip addr (note new IP)

**Exercise 3: Analyze DHCP with Wireshark**
1. Start Wireshark capture
2. Release and renew IP address
3. Filter for: bootp (DHCP uses BOOTP protocol)
4. Identify in capture:
   - Discover message
   - Offer message
   - Request message
   - Acknowledge message
5. Examine packet details for each message

**Exercise 4: DHCP Troubleshooting Simulation**
1. Disable your DHCP server (or unplug from network)
2. Release IP address
3. Try to renew
4. Observe APIPA assignment (169.254.x.x)
5. Document how long it takes to get APIPA
6. Reconnect and renew normally

**Exercise 5: Home Router DHCP**
Access your home router:
1. Find DHCP settings page
2. Document:
   - DHCP range (start/end IPs)
   - Subnet mask
   - Lease time
   - Gateway address
   - DNS servers
3. Identify any reserved IPs
4. Note number of current DHCP clients

**Bonus: Create DHCP Scope Design**
Design DHCP scopes for a company:
- Building A: 200 workstations
- Building B: 150 workstations
- Building C: 100 workstations
- 10 printers per building (static)
- 5 servers per building (static)
- Point-to-point links between buildings

Use 10.0.0.0/8 network and create:
- IP addressing plan
- Scope ranges
- Exclusions
- Lease times
- Document your design`
};

export default day5Module;
