# MachineWise — Engineering Contributions & Responsibilities

> **Purpose:** A detailed, memory-based record of the work and responsibilities described across prior conversations. This is intended as a working reference for performance reviews, internal documentation, résumé preparation, and interview-story development—not as a public project case study.
>
> **Confidentiality note:** MachineWise is employer-related work. Do not present its product, code, customer deployments, or internal functionality as an independently owned portfolio project. Any public-facing description should be reviewed for confidentiality and approved disclosure.

## 1. Executive summary

My work around MachineWise has spanned industrial software engineering, full-stack product development, manufacturing analytics, scheduling and capacity-planning workflows, applied AI/LLM features, client-site deployment, production troubleshooting, and engineering team leadership. Alongside core monitoring and reporting workflows, I also worked on an AI chatbot that uses retrieval-augmented generation (RAG) over industrial manuals, local LLM inference using Ollama and llama.cpp, and LLM-based CTQ (Critical-to-Quality) extraction.

The product connects industrial machine activity and operational data to backend services and web dashboards. The application supports job scheduling, ongoing and completed production schedules, machine utilization, capacity planning, and manufacturing reports. My responsibilities have included developing and refining application workflows, working across frontend and backend concerns, supporting deployments in constrained client-site environments, diagnosing Docker/networking/database issues, and coordinating delivery with engineers and clients.

The work is best described as **full-stack industrial software, applied AI for manufacturing, and software R&D leadership**: building operational tools that turn machine and production data into scheduling, utilization, KPI, reporting, and AI-assisted knowledge/document-understanding workflows.

## 2. Product and business context

MachineWise Monitoring is an industrial monitoring application deployed at customer sites. The operating model described in our conversations is a locally hosted installation, commonly running in a VirtualBox virtual machine with application services packaged as Docker containers.

At a high level, the system brings together:

- Industrial machine activity and data acquisition.
- Backend services and persistence for operational records.
- Web interfaces for scheduling, production status, utilization, and reports.
- Manufacturing KPIs that help users understand productive time, idle time, output, targets, and available capacity.
- Site-specific deployment and support requirements, including network, database, and container operations.

This context matters: the software must be useful on a factory floor and remain operable in customer environments, not only work on a developer laptop.

## 3. Functional modules and product workflows

### 3.1 Job Scheduling

Worked on the job-scheduling area used to create schedules and start jobs on machines. The workflow connects planning activities with the operational execution of jobs.

Responsibilities and related work discussed:

- Supporting creation and management of job schedules.
- Working with scheduled jobs that are intended to run on production machines.
- Connecting schedule data to the application’s machine and production workflows.
- Working with schedule-related models and data used by future-job views.

### 3.2 Ongoing and Completed Schedule Details

Worked on views that present the status and performance of jobs after they have been started, as well as details for completed schedules.

The schedule views include or are designed around production KPIs such as:

- Productive time.
- Idle time.
- Parts produced.
- Production target.
- Required time.

This work supports the transition from a schedule as a plan to a schedule as an operational record: users can inspect execution and compare actual progress with planned or expected values.

### 3.3 Machine Utilization and Capacity Planning

Worked on the Machine Utilization area, including capacity and booking views across a monthly planning horizon and utilization details for an individual machine.

Known UI and API details from our conversations include:

- A machine-utilization table.
- A machine-details view with a bar chart comparing **total hours, booked hours, and free capacity**.
- Date-range interaction using a date/time picker.
- An API route discussed as `/scheduling/utilizations/single-machine`.
- Response data containing machine details and schedules.
- Date handling that used Moment.js in the relevant code path.

The purpose of this area is to make machine availability and planned workload visible, helping users reason about how much capacity is booked and how much remains available.

### 3.4 Future Schedules and Schedule Data

Worked around future-job scheduling workflows and related data models. Conversation references include `CloudData` and `Schedule` models, along with components such as `FutureScheduleForm` and schedule tables.

This points to work spanning both form-based entry and table-based inspection of planned production, rather than a single isolated UI screen.

### 3.5 Manufacturing reports and KPI data

The MachineWise reporting and data workflows discussed include:

- **G-Code report** — a manufacturing-oriented report associated with machine/program activity.
- **Feed analysis** — analysis of feed-related machine data.
- **Man Machine Material (MMM) report** — a pivot-table-style view for analyzing production information across man, machine, and material dimensions.
- **Operator HMI KPI data** — KPI information associated with the operator-facing HMI workflow.
- **Machine performance summaries** — reports that present productive time, idle time, output, targets, and related shift-level indicators.

These reporting features are important because raw machine data becomes substantially more useful when it can be explored in a report, aggregated into KPIs, or interpreted in the context of production planning and performance.

### 3.6 Hourly machine-performance reporting

A MachineWise Monitor and Improve hourly Telegram report format was discussed and refined. The example format included a reporting date, a time window, the current shift, machine names, and per-machine performance details such as production time and idle time, with OEE-related information.

Related work included shaping the report so an operations team can quickly scan hourly machine-performance insights in a familiar messaging channel. The examples referenced machine identifiers such as DTC-19 and DTC-18; these are operational examples, not performance claims.

## 4. Frontend engineering

The frontend work discussed for MachineWise uses a React-based web application and Material UI (MUI) components. Specific components and libraries mentioned include:

- **React and MUI** for application screens and controls.
- **MUI DataGrid** for schedule and utilization tables.
- **MUI DateTimePicker** for date/time selection in utilization workflows.
- **ApexCharts** for the machine-capacity bar chart.
- **Moment.js** for date handling in the utilization flow.
- Components and views named in prior discussions, including `Machine Utilization Table`, `MachineDetails`, `FutureScheduleForm`, `OngoingScheduleTable`, and a `DataGrid`-based schedule UI.

The frontend responsibilities covered more than rendering static information. They included the interactions and data presentation needed for schedule management, status inspection, date-driven utilization queries, and capacity visualization.

Other frontend tools such as Tailwind CSS and shadcn/ui are part of my broader development toolkit, but they are **not attributed here as confirmed MachineWise implementation choices** because the conversations specifically tied the MachineWise screens above to MUI and ApexCharts.

## 5. Backend, APIs, and data handling

The broader application stack discussed in connection with the work includes Node.js/Express-style backend services and MongoDB persistence, with application services running in containers. The most concrete endpoint detail retained in our conversations is:

- `GET/route family: /scheduling/utilizations/single-machine` — discussed as returning `machineDetails` and schedules for the utilization view.

Related implementation concerns included:

- Schedule and future-schedule data models.
- Returning machine and schedule information needed to populate UI views.
- Date/time filtering and handling for utilization calculations.
- Connecting operational records to KPI and reporting screens.
- Operating MongoDB as part of the deployed application environment and performing backup/restore tasks.

The precise HTTP method, request schema, response schema, aggregation pipeline, and ownership of each backend file were not fully documented in the retained conversation history, so those details should be verified against the current repository before being used in technical documentation.

## 6. Industrial data, machine status, and messaging

The MachineWise context includes software that connects machine activity and data acquisition to backend services and browser-based dashboards. MQTT/EMQX also appeared in operational troubleshooting, including warnings about machine-state publishing failures for several machines.

This establishes experience working around the operational boundary between machine-level activity and application-level monitoring, including the need to investigate message flow and data publication failures. The conversation history does **not** establish every machine protocol, PLC brand, CNC/controller integration, or the exact topology of the acquisition layer, so those specifics should not be assumed.

## 7. Applied AI and LLM initiatives for industrial workflows

In addition to the monitoring application and manufacturing reports, I worked on AI/LLM capabilities intended for industrial use cases. These initiatives applied language models to technical knowledge retrieval and quality-related document understanding.

### 7.1 RAG-based industrial manual chatbot

Built or contributed to a chatbot experience based on **retrieval-augmented generation (RAG)** for industrial manuals. The goal of this pattern is to let users ask questions in natural language and receive answers grounded in relevant material retrieved from technical documentation, rather than relying only on the language model's general training knowledge.

The core concept and contribution areas include:

- Making industrial/manual documentation usable through a conversational question-and-answer interface.
- Using retrieval to find relevant manual content for a user's question and providing that context to the LLM to generate a more grounded response.
- Applying an AI interaction model to industrial technical knowledge, where answers should be tied to source documentation rather than treated as free-form chatbot output.

The retained conversation context confirms the RAG industrial-manual chatbot initiative, but does not specify the exact embedding model, vector database, chunking strategy, reranking method, citation format, evaluation scores, or supported document formats. Those details should be added only after checking the implementation.

### 7.2 Local LLM chatbot inference with Ollama and llama.cpp

Worked with local model-serving/runtime options for an AI chatbot, including **Ollama** and **llama.cpp**. This represents hands-on exploration or implementation of self-hosted LLM inference for industrial or customer-site use cases, where deployment constraints may make local execution useful.

Relevant engineering considerations for this category of solution include:

- Running an LLM inference runtime locally instead of depending exclusively on a third-party hosted inference API.
- Integrating a local model endpoint/runtime into a chatbot application flow.
- Considering deployment, model availability, hardware capacity, latency, and operational control when selecting a local inference approach.
- Supporting an architecture in which conversational AI can potentially run within a controlled customer environment.

The exact model names, quantization, serving configuration, performance measurements, API compatibility layer, and production rollout status were not recorded for this specific MachineWise chatbot, so they are not asserted here.

### 7.3 LLM-based CTQ extraction

Worked on **Critical-to-Quality (CTQ) extraction using an LLM**. CTQs are quality characteristics or requirements that matter to whether a product, part, or process meets its required specifications. Using an LLM for CTQ extraction applies language understanding to identify and structure quality-relevant information from source material.

At a contribution-summary level, this work demonstrates applying an LLM to an industrial information-extraction task rather than only to conversational question answering. The intended capability is to help surface quality-critical requirements from technical or business documents in a form that can be reviewed and used downstream.

The retained notes do not identify the precise source-document types, output schema, validation rules, extraction accuracy, human-review process, or downstream integration. These should be verified before describing the feature as fully automated, production-validated, or associated with a quantified quality improvement.

### 7.4 What these AI initiatives add to the overall engineering profile

Taken together, the AI work extends the contribution profile in three directions:

1. **Knowledge retrieval:** RAG to connect natural-language questions to industrial manual content.
2. **Model deployment:** local LLM execution with Ollama and llama.cpp, rather than treating all inference as a cloud-only capability.
3. **Structured information extraction:** using LLMs to identify CTQ-related information in industrial contexts.

These are complementary to the monitoring product: the traditional application surfaces machine state, schedule, and production information, while the AI initiatives explore how users can retrieve technical knowledge and extract useful structured information from industrial documents.

## 8. Deployment architecture and client-site operations

A significant part of the work described is the practical operation of software in customer environments.

### 7.1 Containerized application delivery

- Worked with Docker and Docker Compose to run the frontend, backend, database, and supporting services.
- Supported a deployment approach in which application images are transferred and updated at customer sites.
- Worked with `.tar.gz` image packages for offline or controlled over-the-air (OTA) updates.
- Discussed versioned images and a JSON manifest to coordinate which container versions should be deployed.
- Worked with registry-hosted backend and frontend images; an example conversation involved `machinewise/backend:17.31.2` and `machinewise/frontend:7.49.0`.

This is useful operational context for industrial customers where a site may have constrained internet access or require controlled, versioned updates.

### 7.2 VirtualBox and local-site hosting

- Supported a deployment model where MachineWise runs locally on a customer site inside a VirtualBox VM.
- Investigated connectivity and service behavior within the VM and its network interfaces.
- Worked with container bridges, host networking, port mapping, and access to host-level resources where the deployment required it.

### 7.3 Nginx, HTTPS, and reverse proxying

The deployment setup discussed includes:

- Nginx serving or proxying the frontend.
- Nginx reverse proxying requests to backend services.
- HTTPS configuration and self-signed certificates in site-local environments.
- Troubleshooting browser, proxy, and certificate-related connectivity problems.

### 7.4 Registry and network troubleshooting

A detailed troubleshooting thread investigated container image pull failures and registry connectivity. Work included checks with `curl`, `wget`, `openssl`, `dig`, and certificate inspection, comparing TLS behavior, checking DNS resolution and registry endpoints, and examining possible networking/MTU/offload issues.

The diagnostics distinguished a normal registry authentication response (`401 Unauthorized`, which indicates the endpoint was responding and authentication was required) from connection or protocol problems. Other errors included an HTTP response where HTTPS was expected and intermittent TLS/EOF behavior during downloads. These are examples of the production-support problem-solving work; they should not be described as a permanent fix unless confirmed in the deployment records.

### 7.5 Remote access and site support

FRP (`frpc`) configuration and TCP tunnel troubleshooting also appeared in customer-PC connectivity discussions, including exposing SSH and forwarding ports to internal endpoints. This is relevant to the wider remote-support and field-deployment context, although the exact mapping of each tunnel to a MachineWise feature should be verified before claiming it as a formal product component.

## 9. Database operations, backups, and recovery

MongoDB operational work discussed alongside the deployment environment included:

- Inspecting Docker mounts and data paths for MongoDB and related services.
- Working on backup scripts that dump databases to a local backup directory and then copy backups to a NAS.
- Testing backup scripts and diagnosing path/directory problems.
- Considering restoration to a different MongoDB instance under a different database name.
- Investigating version-compatibility warnings when a backup from MongoDB 8.0.20 was restored toward MongoDB 8.2.11.
- Looking at MongoDB/WiredTiger error conditions.

These tasks support the reliability and maintainability of the deployed system. The recorded information does not prove a specific recovery-time objective, backup-retention policy, or tested disaster-recovery guarantee; those should only be stated if documented elsewhere.

## 10. Troubleshooting and operational problem-solving

The range of issues discussed demonstrates hands-on work across the application stack rather than only feature development. Examples include:

- Diagnosing MQTT machine-state publishing warnings.
- Investigating registry TLS and image-download failures.
- Troubleshooting container networking, host-network constraints, port mappings, DNS, and HTTPS reverse proxies.
- Checking MongoDB container volumes, database backups, restores, and version compatibility.
- Investigating system time synchronization issues in a VM, which can affect logs, timestamps, and certificate-sensitive services.
- Reviewing Docker Compose configuration and service startup behavior.

These are useful examples of operational ownership and production debugging. For an internal review or interview, it is strongest to pair each issue with the exact root cause and verified resolution from logs or tickets, rather than imply every investigation had the same outcome.

## 11. Engineering leadership, delivery, and client coordination

My responsibilities have expanded beyond individual implementation into leading engineering delivery. The role description and responsibilities shared in prior conversations include:

- Leading a team of approximately seven people.
- Coordinating work across multiple engineering teams or workstreams.
- Managing task allocation, delivery progress, and project execution.
- Interacting with clients to understand requirements, discuss issues, and align on delivery.
- Contributing directly to development while also managing people and priorities.
- Working across full-stack web development, enterprise customization, ERP integrations, role-based access control (RBAC), and workflow-management concerns as part of the broader software R&D scope.
- Driving exploration of AI/ML/LLM-enabled software solutions as part of the wider R&D direction.

A role update shared in our conversations stated **Manager – Software R&D**, effective **1 September 2026**. The leadership details above reflect the responsibilities described, not a claim that every listed workstream was part of MachineWise Monitoring itself.

## 12. Technology and tools: what is evidenced

| Area | Technologies / tools mentioned | Confidence for MachineWise context |
|---|---|---|
| Frontend | React, MUI, MUI DataGrid, MUI DateTimePicker | Directly discussed in MachineWise UI work |
| Visualization | ApexCharts | Directly discussed for the machine capacity/utilization chart |
| Date handling | Moment.js | Directly discussed in the utilization API/UI flow |
| Backend | Node.js / Express-style services | Part of the broader application stack described; verify exact service implementation |
| Data storage | MongoDB | Directly present in the containerized deployment and operations context |
| Containers | Docker, Docker Compose | Directly present in deployment and support work |
| Virtualization | VirtualBox VM | Directly described as the client-site hosting model |
| Web serving | Nginx, reverse proxy, HTTPS/self-signed certificates | Directly present in deployment setup discussions |
| Messaging | MQTT / EMQX | Present in machine-state publishing troubleshooting |
| Data/reporting | G-Code reports, feed analysis, MMM pivot report, operator HMI KPI data | Directly referenced as product/reporting areas |
| Applied AI | RAG-based industrial manual chatbot; LLM-based CTQ extraction | Directly confirmed by user |
| Local LLM runtime | Ollama, llama.cpp | Directly confirmed by user for chatbot work; exact deployment details should be verified |
| Deployment packages | Docker image tarballs, versioned images, JSON manifest | Directly discussed for controlled/OTA updates |
| Remote access | FRP / frpc | Appeared in related client connectivity troubleshooting; exact product linkage should be verified |
| Broader development toolkit | TypeScript, Tailwind CSS, shadcn/ui, other tools | General preferences/toolkit; not asserted here as confirmed MachineWise production choices |

## 13. Practical impact and value

Without inventing metrics, the work can be described in terms of capabilities delivered or supported:

1. **Better production visibility:** schedule views and machine KPIs expose productive time, idle time, output, and target-related information.
2. **More informed planning:** utilization and capacity views compare total hours, booked hours, and free capacity across a planning period.
3. **A bridge between shop-floor activity and software workflows:** machine and schedule information is presented in web interfaces and operational reports.
4. **More actionable reporting:** manufacturing reports and hourly summaries package machine information in forms useful to operators and teams.
5. **Deployability at customer sites:** containerized services, VM-based hosting, HTTPS/reverse-proxy setup, and versioned image delivery support a repeatable deployment approach.
6. **Operational resilience:** backup/restore work and structured troubleshooting address the realities of running industrial software on customer infrastructure.
7. **Cross-functional delivery:** engineering leadership and client coordination help connect technical implementation with product requirements and delivery commitments.

These are qualitative impact statements. No machine-count, uptime, throughput, cost-saving, defect-reduction, or productivity-improvement numbers were captured in the memory used to prepare this document.

## 14. Résumé-ready contribution bullets

The bullets below are deliberately written to be strong while avoiding unsupported metrics. Adjust them to match the exact ownership level and evidence you can substantiate.

- Led full-stack development and delivery of industrial monitoring workflows spanning job scheduling, production schedule tracking, machine utilization, and capacity planning.
- Built and refined React/MUI interfaces for schedule management, machine utilization tables, date-driven queries, and chart-based capacity visibility.
- Developed or supported data flows that present productive time, idle time, parts produced, targets, required time, booked hours, and free machine capacity.
- Worked on manufacturing reporting workflows, including G-Code reporting, feed analysis, Man Machine Material pivot analysis, and operator-HMI KPI data.
- Supported hourly machine-performance reporting, organizing shift and machine KPIs into operational Telegram summaries.
- Developed or contributed to a RAG-based chatbot for conversational access to industrial manuals, grounding responses in retrieved technical documentation.
- Worked with Ollama and llama.cpp as local LLM inference/runtime options for chatbot use cases, considering self-hosted model execution for controlled environments.
- Applied LLMs to CTQ (Critical-to-Quality) extraction, exploring structured identification of quality-relevant requirements from industrial source material.
- Worked across backend APIs, scheduling data models, MongoDB persistence, and date/time handling to connect application views with operational data.
- Supported Docker Compose-based application deployments in VirtualBox-hosted customer environments, including Nginx reverse proxying, HTTPS, and controlled image updates.
- Diagnosed production-environment issues across container networking, registry/TLS connectivity, MQTT/EMQX messaging, MongoDB backup/restore, and service configuration.
- Coordinated engineering delivery, team priorities, client interactions, and hands-on implementation as part of a software R&D leadership role.

**Before using these in a résumé:** validate verbs such as “built,” “owned,” “designed,” or “led” against your exact role on each feature. Replace qualitative impact with numbers only when backed by production evidence.

## 15. Interview-ready project narrative

> I work on industrial software that connects machine activity and production data with web-based operational workflows. My responsibilities have covered job scheduling, ongoing/completed schedule tracking, machine utilization, monthly capacity planning, manufacturing reports, and machine KPI reporting. On the application side, I have worked with React and MUI-based interfaces, data grids, date-driven utilization views, and chart visualizations. On the deployment side, the product is delivered to client sites in a containerized setup, commonly within a VirtualBox VM, so I have also worked through Docker Compose, Nginx and HTTPS configuration, registry and network troubleshooting, MQTT-related issues, and MongoDB backup/restore operations. I have also worked on applied AI capabilities for industrial use cases: a RAG-based chatbot for querying industrial manuals, local chatbot inference options using Ollama and llama.cpp, and LLM-based CTQ extraction. Alongside hands-on engineering, I coordinate engineers, client communication, priorities, and project delivery.

Use this as a starting narrative, then add one concrete story with a problem, your specific actions, the technical trade-offs, and a verified result.

## 16. Strong technical stories to document next

The following would make the contribution record materially stronger if you add specific details from source code, tickets, release notes, or metrics:

- A scheduling feature: user problem, API/model changes, UI workflow, edge cases, and adoption.
- A capacity-planning feature: calculation logic, date boundaries, booked/free-hour rules, and validation against real schedules.
- A manufacturing report: source data, transformations, filters/pivot dimensions, and operational decision it enabled.
- An hourly KPI report: data source, OEE/KPI calculation rules, Telegram delivery flow, and how failures are handled.
- A client-site deployment: architecture, update/rollback process, offline constraints, and verified resolution of a difficult installation issue.
- A reliability fix: exact incident, root cause, change made, validation, and effect on uptime or support effort.
- An industrial-manual RAG chatbot: document ingestion, chunking, embeddings, retrieval, answer grounding/citations, evaluation approach, and failure handling.
- A local LLM chatbot deployment: which runtime (Ollama or llama.cpp) was used, model/quantization, API integration, target hardware, latency, and offline/customer-site constraints.
- A CTQ extraction workflow: source documents, extraction schema, validation and human-review process, precision/recall or acceptance results, and downstream use.
- A leadership example: team size and composition, planning cadence, delivery constraints, decisions made, and measurable outcome.

## 17. Accuracy boundaries

This document consolidates remembered discussion, not a source-code audit or a complete employment record. The following details are intentionally **not invented**:

- Exact dates for when each feature was implemented.
- Exact split of individual ownership versus team contribution.
- Complete architecture diagrams, database schemas, or all API contracts.
- Specific PLC/CNC brands or protocols beyond the general machine-data and MQTT/EMQX context.
- Production totals, uptime improvements, customer counts, revenue impact, or quantified savings.
- A claim that every technology mentioned in the broader development toolkit is used in MachineWise production.
- AI implementation specifics not present in the retained notes, such as the RAG vector store, embedding model, exact LLM/model versions, CTQ output format, or measured extraction quality.
- A claim that every remote-access or infrastructure task was a formal part of the MachineWise product.

For the most accurate final version, cross-check the repository, release notes, issue tracker, deployment manifests, and review documents. This file is a comprehensive starting point based on what has been discussed so far.
