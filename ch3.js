window.CH = window.CH || [];
CH.push(
{n:21,t:"Les services sans serveur",v:"21_les_services_sans_serveur.mp4",d:3,
zero:`<p><b>Serverless (sans serveur)</b> ne veut pas dire qu’il n’y a pas de serveurs : ça veut dire que <b>tu ne les vois pas et ne les gères pas</b>. Comme un taxi : tu ne t’occupes ni de l’essence, ni de l’entretien, ni du parking. Tu paies la course, point.</p>`,
exam:`<h4>Caractéristiques du serverless</h4><ul>
<li>Aucun serveur à provisionner ni patcher</li><li><b>Mise à l’échelle automatique</b> (même jusqu’à zéro)</li>
<li><b>Paiement à l’usage réel</b> (pas de frais quand rien ne tourne)</li><li>Haute disponibilité intégrée</li></ul>
<table><tr><th>Domaine</th><th>Services serverless</th></tr>
<tr><td>Calcul</td><td><b>Lambda</b>, <b>Fargate</b></td></tr>
<tr><td>Stockage</td><td><b>S3</b>, EFS</td></tr>
<tr><td>Bases de données</td><td><b>DynamoDB</b>, Aurora Serverless</td></tr>
<tr><td>API & intégration</td><td><b>API Gateway</b>, SQS, SNS, EventBridge, Step Functions</td></tr>
<tr><td>Analytique</td><td><b>Athena</b>, Glue, Redshift Serverless, Kinesis Data Firehose</td></tr>
<tr><td>Identité</td><td>Cognito</td></tr></table>
<p><b>Architecture serverless classique</b> : S3 (site statique) + CloudFront + API Gateway + Lambda + DynamoDB + Cognito.</p>`,
pro:`<ul><li>Sur l’examen, « <b>le moins de frais de gestion / d’effort opérationnel</b> » pointe presque toujours vers une option serverless.</li>
<li>Limites à connaître : Lambda 15 min, cold starts, moins de contrôle sur l’environnement.</li>
<li>Le serverless favorise l’<b>architecture orientée événements</b> : un upload S3 déclenche une Lambda qui écrit dans DynamoDB.</li>
<li>Coût : excellent pour un trafic irrégulier ; pour une charge très élevée et constante, EC2 réservé peut revenir moins cher.</li>
<li>EC2, RDS « classique » et EBS ne sont <b>pas</b> serverless.</li></ul>`,
q:[
{q:"Lesquels sont des services serverless ? (Choisissez DEUX.)",o:["Amazon EC2","AWS Lambda","Amazon DynamoDB","Amazon RDS (instances provisionnées)","Amazon EBS"],a:[1,2],e:["Il faut gérer des instances.","Exact.","Exact.","Il faut choisir et dimensionner une instance.","Volume attaché à une instance."]},
{q:"Quel est un avantage du serverless ?",o:["Contrôle total du système d’exploitation","Aucun paiement quand le code ne s’exécute pas","Exécutions illimitées en durée","Accès SSH aux serveurs"],a:[1],e:["C’est l’inverse : pas d’accès à l’OS.","Exact : paiement à l’usage réel.","Lambda est limité à 15 minutes.","Pas d’accès aux serveurs."]},
{q:"Quel service crée un point d’entrée HTTP pour invoquer des fonctions Lambda ?",o:["Amazon API Gateway","Amazon Route 53","AWS Direct Connect","Amazon EFS"],a:[0],e:["Exact.","DNS.","Liaison réseau privée.","Système de fichiers."]}]},

{n:22,t:"Windows sur AWS",v:"22_windows_sur_aws.mp4",d:3,
zero:`<p>Beaucoup d’entreprises fonctionnent avec Microsoft : serveurs Windows, Active Directory (gestion des comptes employés), SQL Server, .NET. AWS permet de faire tourner tout cet écosystème dans le cloud, avec ou sans tes licences existantes.</p>`,
exam:`<table><tr><th>Besoin Microsoft</th><th>Solution AWS</th></tr>
<tr><td>Serveur Windows</td><td>EC2 avec AMI Windows Server (licence incluse)</td></tr>
<tr><td>SQL Server managé</td><td>RDS for SQL Server</td></tr>
<tr><td>Active Directory</td><td><b>AWS Directory Service</b> (AWS Managed Microsoft AD, AD Connector, Simple AD)</td></tr>
<tr><td>Partage de fichiers Windows (SMB)</td><td><b>FSx for Windows File Server</b></td></tr>
<tr><td>Bureaux virtuels Windows</td><td><b>Amazon WorkSpaces</b></td></tr>
<tr><td>Licences existantes par cœur (BYOL)</td><td><b>Dedicated Hosts</b> + License Manager</td></tr>
<tr><td>Applis .NET</td><td>SDK .NET, Toolkit pour Visual Studio, Beanstalk</td></tr>
<tr><td>Migrer des VMs Windows</td><td>Application Migration Service</td></tr></table>
<p>Options de licence : <b>License Included</b> (prix horaire inclut la licence Microsoft) ou <b>BYOL</b>.</p>`,
pro:`<ul><li>« Les utilisateurs doivent se connecter avec leurs identifiants AD existants » → AD Connector (proxy vers l’AD sur site) ou AWS Managed Microsoft AD avec relation d’approbation.</li>
<li>EFS ne supporte pas Windows (NFS Linux) → pour Windows, c’est <b>FSx for Windows</b>.</li>
<li>Systems Manager gère aussi les correctifs Windows.</li>
<li>Les instances Windows sont facturées à la seconde (minimum 1 min) comme Linux depuis 2023 pour la plupart des cas — détail rarement testé.</li>
<li>AWS offre des crédits/programmes (MAP) pour migrer des charges Windows/SQL Server.</li></ul>`,
q:[
{q:"Des instances EC2 Windows doivent partager des fichiers via le protocole SMB et s’intégrer à Active Directory. Quel service ?",o:["Amazon EFS","Amazon FSx for Windows File Server","Amazon S3","Amazon EBS"],a:[1],e:["EFS est NFS pour Linux.","Exact.","Stockage objet, pas un partage SMB.","Bloc, attaché à une seule instance."]},
{q:"Une entreprise veut utiliser ses licences Windows Server existantes liées aux cœurs physiques. Quelle option EC2 ?",o:["Spot Instances","Dedicated Hosts","On-Demand License Included","Lightsail"],a:[1],e:["Pas de visibilité sur les cœurs.","Exact.","La licence est déjà incluse dans le prix (on ne réutilise pas la sienne).","Pas adapté au BYOL par cœur."]},
{q:"Quel service fournit un Active Directory Microsoft managé sur AWS ?",o:["AWS Directory Service","Amazon Cognito","IAM","AWS Organizations"],a:[0],e:["Exact (AWS Managed Microsoft AD).","Identité pour applis web/mobiles.","Identités AWS, pas un AD Windows.","Gestion multi-comptes."]}]},

{n:23,t:"Journalisation et surveillance",v:"23_la_journalisation_et_la_surveillance.mp4",d:2,
zero:`<p>Pour piloter un système, il faut des <b>instruments</b> :</p><ul>
<li>un <b>tableau de bord</b> (vitesse, température) → <b>CloudWatch</b> ;</li>
<li>une <b>caméra de surveillance</b> qui enregistre qui entre et ce qu’il fait → <b>CloudTrail</b> ;</li>
<li>un <b>photographe</b> qui prend une photo de la configuration à chaque changement → <b>Config</b>.</li></ul>`,
exam:`<table><tr><th>Service</th><th>Question à laquelle il répond</th></tr>
<tr><td><b>CloudTrail</b></td><td>QUI a fait QUOI, QUAND, D’OÙ ? (appels API, console, CLI) — 90 jours d’historique par défaut, « trails » vers S3 pour plus</td></tr>
<tr><td><b>CloudWatch Metrics</b></td><td>Comment se porte ma ressource ? (CPU, réseau, métriques perso)</td></tr>
<tr><td><b>CloudWatch Alarms</b></td><td>Prévenir/agir quand un seuil est dépassé (SNS, Auto Scaling)</td></tr>
<tr><td><b>CloudWatch Logs</b></td><td>Centraliser et analyser les journaux applicatifs (Logs Insights)</td></tr>
<tr><td>CloudWatch Dashboards</td><td>Tableaux de bord visuels</td></tr>
<tr><td><b>EventBridge</b></td><td>Réagir à des événements (ex-CloudWatch Events)</td></tr>
<tr><td><b>AWS Config</b></td><td>À quoi ressemblait la configuration hier ? Est-elle conforme ?</td></tr>
<tr><td><b>X-Ray</b></td><td>Où ma requête perd-elle du temps ?</td></tr>
<tr><td>VPC Flow Logs</td><td>Quel trafic IP entre/sort de mon VPC ?</td></tr>
<tr><td>AWS Health Dashboard</td><td>AWS a-t-il un problème qui me touche ?</td></tr>
<tr><td>Managed Grafana / Prometheus</td><td>Observabilité open source managée</td></tr></table>`,
pro:`<ul><li>Le piège n°1 de l’examen : <b>CloudTrail = audit des actions</b>, <b>CloudWatch = performance/opérations</b>.</li>
<li>Métrique par défaut d’EC2 : CPU, réseau, disque… mais <b>pas la mémoire</b> → il faut l’<b>agent CloudWatch</b>.</li>
<li>CloudTrail Lake : interroger les événements en SQL. Activer CloudTrail dans <b>toutes les régions</b> et pour toute l’organisation.</li>
<li>Pour prouver qu’un journal n’a pas été modifié : <b>validation d’intégrité</b> des fichiers CloudTrail.</li>
<li>Config + CloudTrail ensemble : Config dit <i>ce qui</i> a changé, CloudTrail dit <i>qui</i> l’a changé.</li></ul>`,
q:[
{q:"Une équipe veut recevoir une alerte quand le CPU d’une instance dépasse 80 % pendant 5 minutes. Quel service ?",o:["AWS CloudTrail","Amazon CloudWatch (alarme)","AWS Config","AWS Artifact"],a:[1],e:["CloudTrail ne mesure pas l’utilisation CPU.","Exact.","Config ne suit pas les métriques de performance.","Rapports de conformité."]},
{q:"Un bucket S3 a été rendu public. L’équipe sécurité veut savoir QUI a fait ce changement. Quel service ?",o:["AWS CloudTrail","Amazon CloudWatch Metrics","Amazon Macie","AWS Trusted Advisor"],a:[0],e:["Exact : l’appel PutBucketPolicy est journalisé avec l’identité.","Pas d’identité de l’appelant.","Macie trouve des données sensibles, pas l’auteur d’une modification.","Peut signaler le bucket public, mais pas qui l’a modifié."]},
{q:"Quelle métrique EC2 nécessite l’installation de l’agent CloudWatch ?",o:["Utilisation CPU","Réseau entrant","Utilisation de la mémoire","Vérification d’état (status check)"],a:[2],e:["Disponible par défaut.","Disponible par défaut.","Exact : la mémoire est visible seulement depuis l’OS.","Disponible par défaut."]}]},

{n:24,t:"IA, apprentissage automatique et big data",v:"24_ia_apprentissage_automatique_et_big_data.mp4",d:3,
zero:`<p><b>Big data</b> = des volumes de données énormes qu’il faut collecter, stocker, transformer et analyser. <b>Machine learning</b> = apprendre à un ordinateur à reconnaître des motifs à partir d’exemples. <b>IA générative</b> = des modèles qui créent du texte, des images, du code.</p>
<p>AWS propose trois niveaux : des <b>services prêts à l’emploi</b> (une API qui reconnaît des visages), une <b>plateforme</b> pour construire tes modèles (SageMaker), et l’<b>accès à des modèles géants</b> (Bedrock).</p>`,
exam:`<h4>Big data / analytique (chaîne : ingérer → stocker → transformer → analyser → visualiser)</h4>
<table><tr><td><b>Kinesis</b></td><td>Ingestion temps réel (Data Streams, Data Firehose, Video Streams)</td></tr>
<tr><td><b>MSK</b></td><td>Kafka managé</td></tr>
<tr><td><b>S3</b> + Lake Formation</td><td>Data lake (lac de données) et sa gouvernance</td></tr>
<tr><td><b>Glue</b></td><td>ETL serverless + Data Catalog + DataBrew (préparation visuelle)</td></tr>
<tr><td><b>EMR</b></td><td>Spark, Hadoop, Hive</td></tr>
<tr><td><b>Athena</b></td><td>SQL sur S3</td></tr>
<tr><td><b>Redshift</b></td><td>Entrepôt de données</td></tr>
<tr><td><b>OpenSearch</b></td><td>Recherche, analyse de logs</td></tr>
<tr><td><b>QuickSight</b></td><td>BI, tableaux de bord</td></tr>
<tr><td>Data Exchange</td><td>Acheter/s’abonner à des jeux de données tiers</td></tr></table>
<h4>IA / ML</h4>
<table><tr><td><b>Bedrock</b></td><td>Modèles de fondation par API (IA générative), agents, bases de connaissances (RAG)</td></tr>
<tr><td><b>Amazon Q</b></td><td>Assistant génératif (Business, Developer)</td></tr>
<tr><td><b>SageMaker AI</b></td><td>Construire, entraîner, déployer tes modèles</td></tr>
<tr><td><b>Rekognition</b></td><td>Images/vidéos : visages, objets, modération</td></tr>
<tr><td><b>Textract</b></td><td>Texte et tableaux de documents</td></tr>
<tr><td><b>Comprehend</b></td><td>NLP : sentiment, entités, langue (Medical : données médicales)</td></tr>
<tr><td><b>Transcribe</b> / <b>Polly</b></td><td>Voix → texte / texte → voix</td></tr>
<tr><td><b>Translate</b></td><td>Traduction</td></tr>
<tr><td><b>Lex</b></td><td>Chatbots (moteur d’Alexa)</td></tr>
<tr><td><b>Kendra</b></td><td>Recherche intelligente d’entreprise</td></tr>
<tr><td><b>Personalize</b></td><td>Recommandations type Amazon.com</td></tr>
<tr><td>Forecast</td><td>Prévisions de séries temporelles</td></tr>
<tr><td>Fraud Detector</td><td>Détection de fraude en ligne</td></tr></table>`,
pro:`<ul><li>Choix rapide : modèle déjà existant pour un besoin courant → <b>service d’IA spécialisé</b> (Rekognition, Textract…). Besoin génératif → <b>Bedrock</b>. Modèle sur-mesure → <b>SageMaker</b>.</li>
<li>Combinaisons classiques : appel client → <b>Transcribe</b> → <b>Comprehend</b> (sentiment) → <b>Translate</b>. Centre d’appels → <b>Connect</b> + Lex.</li>
<li>Data lake serverless : S3 + Glue (catalogue) + Athena + QuickSight.</li>
<li>Bedrock : tes données ne servent pas à entraîner les modèles de base ; elles restent dans ta région.</li>
<li>Puces AWS : <b>Trainium</b> (entraînement), <b>Inferentia</b> (inférence).</li>
<li>Pour aller plus loin après le CLF : la certification <b>AWS Certified AI Practitioner (AIF-C01)</b>.</li></ul>`,
q:[
{q:"Une entreprise veut analyser le sentiment (positif/négatif) des avis clients écrits. Quel service ?",o:["Amazon Rekognition","Amazon Comprehend","Amazon Polly","Amazon Kinesis"],a:[1],e:["Analyse d’images.","Exact : NLP.","Texte → voix.","Streaming de données."]},
{q:"Quel service permet de créer un modèle de ML personnalisé, de l’entraîner et de le déployer ?",o:["Amazon SageMaker AI","Amazon Translate","Amazon QuickSight","AWS Glue"],a:[0],e:["Exact.","Service prêt à l’emploi de traduction.","Visualisation BI.","ETL."]},
{q:"Une entreprise veut ingérer des millions d’événements de clics par seconde en temps réel. Quel service ?",o:["Amazon Kinesis Data Streams","Amazon Redshift","Amazon Athena","AWS Batch"],a:[0],e:["Exact.","Entrepôt d’analyse, pas d’ingestion en flux.","Requêtes sur S3 a posteriori.","Traitement par lots, pas temps réel."]}]},

{n:25,t:"Le Well-Architected Framework",v:"25_le_well_architected_framework.mp4",d:1,
zero:`<p>Le <b>Well-Architected Framework</b>, c’est le <b>guide de bonnes pratiques d’AWS</b> pour construire des systèmes de qualité, organisé en 6 « piliers ». Comme un inspecteur en bâtiment qui vérifie solidité, sécurité, coût, confort et impact écologique d’une maison.</p>`,
exam:`<table><tr><th>Pilier</th><th>Principes de conception clés</th><th>Services liés</th></tr>
<tr><td><b>Excellence opérationnelle</b></td><td>Opérations en code, petits changements fréquents et réversibles, affiner les procédures, anticiper les pannes, apprendre des échecs</td><td>CloudFormation, Config, CloudWatch</td></tr>
<tr><td><b>Sécurité</b></td><td>Identité forte, traçabilité, sécurité à toutes les couches, automatiser, protéger les données en transit et au repos, préparer les incidents</td><td>IAM, KMS, GuardDuty, CloudTrail</td></tr>
<tr><td><b>Fiabilité</b></td><td>Récupération automatique, tester la reprise, scaler horizontalement, arrêter de deviner la capacité, gérer le changement par l’automatisation</td><td>Multi-AZ, Auto Scaling, Backup</td></tr>
<tr><td><b>Efficacité des performances</b></td><td>Démocratiser les technos avancées, global en minutes, serverless, expérimenter, « sympathie mécanique »</td><td>Lambda, CloudFront, types d’instances</td></tr>
<tr><td><b>Optimisation des coûts</b></td><td>Gestion financière du cloud, modèle de consommation, mesurer l’efficacité, éviter les dépenses indifférenciées, analyser et attribuer</td><td>Cost Explorer, Savings Plans, Spot</td></tr>
<tr><td><b>Durabilité</b></td><td>Comprendre son impact, maximiser l’utilisation, adopter du matériel plus efficace, services managés, réduire l’impact aval</td><td>Graviton, Auto Scaling, Customer Carbon Footprint Tool</td></tr></table>
<p><b>AWS Well-Architected Tool</b> : questionnaire gratuit dans la console pour évaluer une charge de travail. <b>Lenses</b> : variantes (Serverless, SaaS, ML…).</p>`,
pro:`<ul><li>Associer une phrase à un pilier est LE type de question. « Tester les procédures de reprise » → <b>Fiabilité</b>. « Activer la traçabilité » → <b>Sécurité</b>. « Utiliser le bon type de ressource / serverless » → <b>Performance</b>. « Annoter la documentation, IaC » → <b>Excellence opérationnelle</b>. « Payer seulement ce qu’on utilise, attribuer les dépenses » → <b>Coûts</b>. « Minimiser les ressources inactives » → <b>Durabilité</b>.</li>
<li>Les piliers sont des <b>compromis</b> : plus de fiabilité (multi-région) coûte plus cher.</li>
<li>« Sympathie mécanique » = choisir la technologie qui correspond à ce qu’on veut faire.</li>
<li>Customer Carbon Footprint Tool : estimer les émissions carbone de ton usage AWS (Durabilité).</li></ul>`,
q:[
{q:"« Tester régulièrement les procédures de reprise » relève de quel pilier ?",o:["Sécurité","Fiabilité","Optimisation des coûts","Durabilité"],a:[1],e:["La sécurité prépare les incidents de sécurité, mais tester la reprise est un principe de fiabilité.","Exact.","Sans rapport.","Sans rapport."]},
{q:"Quel pilier vise à réduire l’impact environnemental des charges de travail ?",o:["Efficacité des performances","Excellence opérationnelle","Durabilité","Fiabilité"],a:[2],e:["Concerne l’usage efficace des ressources pour la performance.","Concerne les opérations.","Exact.","Concerne la reprise après panne."]},
{q:"Quel outil gratuit évalue une charge de travail selon les 6 piliers ?",o:["AWS Trusted Advisor","AWS Well-Architected Tool","AWS Config","AWS Pricing Calculator"],a:[1],e:["Il fait des contrôles automatiques, mais l’outil d’évaluation par piliers est le Well-Architected Tool.","Exact.","Conformité de configuration.","Estimation de coûts."]}]},

{n:26,t:"Coût total et migration",v:"26_cout_total_et_migration.mp4",d:1,
zero:`<p>Le <b>TCO (coût total de possession)</b>, c’est le <b>vrai</b> prix d’un système : pas seulement les serveurs, mais aussi l’électricité, la climatisation, le bâtiment, les techniciens, les licences, le remplacement du matériel… Le cloud rend une grande partie de ces coûts invisibles car ils sont inclus.</p>
<p>La <b>migration</b>, c’est le déménagement vers le cloud. Comme pour un vrai déménagement : on garde, on jette, on rachète du neuf, on rénove.</p>`,
exam:`<h4>Coûts sur site souvent oubliés</h4><p>Bâtiment, électricité, refroidissement, sécurité physique, personnel IT, réseau, maintenance, renouvellement du matériel tous les 3-5 ans, capacité inutilisée.</p>
<h4>Les 7 R</h4>
<table><tr><td><b>Retire</b></td><td>Supprimer</td></tr><tr><td><b>Retain</b></td><td>Garder sur site (pour l’instant)</td></tr>
<tr><td><b>Rehost</b></td><td>Lift & shift, tel quel</td></tr><tr><td><b>Relocate</b></td><td>VMware → VMware Cloud on AWS</td></tr>
<tr><td><b>Replatform</b></td><td>Lift, tinker & shift (ex. vers RDS, Beanstalk)</td></tr>
<tr><td><b>Repurchase</b></td><td>Drop & shop → SaaS</td></tr><tr><td><b>Refactor</b></td><td>Réarchitecturer en cloud-native</td></tr></table>
<h4>Outils</h4>
<table><tr><td>Migration Evaluator</td><td>Construire le business case / TCO</td></tr>
<tr><td>Application Discovery Service</td><td>Inventorier les serveurs et dépendances sur site</td></tr>
<tr><td><b>Migration Hub</b></td><td>Suivre toutes les migrations</td></tr>
<tr><td><b>Application Migration Service (MGN)</b></td><td>Rehost de serveurs</td></tr>
<tr><td><b>DMS</b> + SCT</td><td>Bases de données</td></tr>
<tr><td><b>DataSync</b></td><td>Transfert de fichiers en ligne</td></tr>
<tr><td>Transfer Family</td><td>SFTP/FTPS vers S3/EFS</td></tr>
<tr><td><b>Snow Family</b></td><td>Transfert physique hors ligne</td></tr>
<tr><td>Migration Acceleration Program (MAP)</td><td>Programme d’accompagnement + crédits</td></tr></table>`,
pro:`<ul><li>Règle Snow : si le transfert réseau prendrait <b>plus d’une semaine</b>, envisage Snowball. Snowcone : ~8–14 To, portable ; Snowball Edge : ~80–210 To, avec calcul en périphérie (zones isolées, navires).</li>
<li>Dans un calcul TCO, le cloud réduit aussi le <b>coût d’opportunité</b> (temps passé à gérer l’infra au lieu d’innover).</li>
<li>Rehost = le plus rapide ; Refactor = le plus long mais le plus de bénéfices cloud.</li>
<li>Migrer ≠ tout migrer d’un coup : on procède par vagues, avec un pilote.</li></ul>`,
q:[
{q:"Lequel est un coût de datacenter sur site souvent oublié dans un calcul de TCO ?",o:["Les frais d’API AWS","Le refroidissement et l’électricité","Les Savings Plans","Le Free Tier"],a:[1],e:["N’existe pas sur site.","Exact.","Modèle de prix AWS.","Offre gratuite AWS."]},
{q:"Une entreprise déplace sa BD Oracle vers Amazon RDS for Oracle sans réécrire l’application. Quelle stratégie ?",o:["Rehost","Replatform","Refactor","Retire"],a:[1],e:["Rehost = tel quel sur EC2 ; passer à RDS est une petite optimisation.","Exact : on change la plateforme (managée) sans modifier le cœur de l’appli.","Pas de réécriture.","On ne supprime pas l’appli."]},
{q:"Quel service suit l’avancement de migrations sur plusieurs outils AWS et partenaires ?",o:["AWS Migration Hub","AWS DataSync","AWS Snowball","AWS Backup"],a:[0],e:["Exact.","Transfère des fichiers.","Transfert physique.","Sauvegardes."]}]},

{n:27,t:"Facturation, prix et support",v:"27_facturation_prix_et_support.mp4",d:4,
zero:`<p>AWS facture comme un compteur d’électricité : <b>tu paies ce que tu consommes</b>, avec des réductions si tu t’engages ou si tu consommes beaucoup. Pour ne pas te faire surprendre : un <b>simulateur de prix</b> avant, des <b>alertes de budget</b> pendant, des <b>rapports</b> après. Et si tu as besoin d’aide, il existe plusieurs <b>niveaux de support</b>, du gratuit au service premium avec un conseiller dédié.</p>`,
exam:`<h4>3 principes de tarification</h4><ol><li>Payer à l’usage</li><li>Payer moins en réservant (RI, SP)</li><li>Payer moins par unité en utilisant plus (paliers de volume)</li></ol>
<p>Moteurs de coût : <b>calcul, stockage, transfert sortant</b>. Entrant = gratuit.</p>
<h4>Outils</h4>
<table><tr><td><b>Pricing Calculator</b></td><td>Estimer avant</td></tr>
<tr><td><b>Billing Dashboard</b></td><td>Facture du mois, paiements</td></tr>
<tr><td><b>Cost Explorer</b></td><td>Analyser, filtrer, prévoir, recommandations RI/SP</td></tr>
<tr><td><b>Budgets</b></td><td>Alertes (coût, usage, couverture RI/SP), actions automatiques</td></tr>
<tr><td><b>Cost and Usage Report / Data Exports</b></td><td>Données les plus détaillées</td></tr>
<tr><td>Cost Anomaly Detection</td><td>Dépenses inhabituelles</td></tr>
<tr><td><b>Cost allocation tags</b></td><td>Coûts par projet/équipe</td></tr>
<tr><td>Facturation consolidée</td><td>Une facture, remises de volume partagées</td></tr></table>
<h4>Plans de support</h4>
<table><tr><th>Plan</th><th>Accès technique</th><th>Délai le plus rapide</th><th>Extras</th></tr>
<tr><td>Basic</td><td>Aucun (seulement compte/facturation)</td><td>—</td><td>Trusted Advisor de base</td></tr>
<tr><td>Developer</td><td>Email, heures ouvrables</td><td>&lt; 12 h (système dégradé)</td><td>1 contact</td></tr>
<tr><td>Business</td><td>24/7 tél./chat/email</td><td>&lt; 1 h (production en panne)</td><td>Tous les contrôles Trusted Advisor, API Support</td></tr>
<tr><td>Enterprise On-Ramp</td><td>24/7</td><td>&lt; 30 min (critique)</td><td>Pool de TAM</td></tr>
<tr><td>Enterprise</td><td>24/7</td><td>&lt; 15 min (critique)</td><td>TAM dédié, Concierge, IEM, revues Well-Architected</td></tr></table>`,
pro:`<ul><li>Le <b>Concierge</b> (Enterprise) aide sur les questions de facturation et de compte.</li>
<li><b>IEM</b> (Infrastructure Event Management) : accompagnement pour un grand événement (Black Friday, lancement).</li>
<li>AWS Budgets peut déclencher des <b>actions</b> (appliquer une SCP, arrêter des instances).</li>
<li>Le <b>Free Tier</b> a changé en juillet 2025 pour les nouveaux comptes (crédits jusqu’à ~200 USD, plan gratuit limité dans le temps) ; les anciens comptes gardent l’ancien modèle. Les questions portent surtout sur le principe : « essayer gratuitement ».</li>
<li>Autres ressources : <b>re:Post</b>, Knowledge Center, documentation, Whitepapers, Prescriptive Guidance, <b>Partner Network</b>, <b>Professional Services</b>, <b>Marketplace</b>, Training & Certification, Solutions Architects (avant-vente).</li>
<li>Le plan de support est <b>par compte</b> (sauf Enterprise qui peut couvrir l’organisation selon les conditions).</li></ul>`,
q:[
{q:"Une entreprise veut connaître à l’avance le coût mensuel d’une nouvelle architecture. Quel outil ?",o:["AWS Cost Explorer","AWS Pricing Calculator","AWS Budgets","AWS CUR"],a:[1],e:["Analyse ce qui a déjà été dépensé.","Exact.","Suit les dépenses réelles.","Détail de facturation réelle."]},
{q:"Quel plan de support offre l’aide d’un Concierge pour la facturation ?",o:["Developer","Business","Enterprise","Basic"],a:[2],e:["Non.","Non.","Exact : le Concierge (aide facturation et compte) fait partie des plans Enterprise (On-Ramp y a aussi accès).","Non."]},
{q:"Quelle affirmation sur la tarification AWS est vraie ?",o:["Le transfert de données entrant est généralement gratuit","Le transfert sortant vers Internet est toujours gratuit","On paie toujours à l’avance pour un an","Plus on consomme, plus le prix unitaire augmente"],a:[0],e:["Exact.","Faux : c’est un moteur de coût.","Faux : On-Demand sans engagement.","Faux : c’est l’inverse (paliers de volume)."]}]},

{n:28,t:"La sécurité",v:"28_la_securite.mp4",d:2,
zero:`<p>La sécurité dans AWS, c’est la <b>défense en profondeur</b> : plusieurs couches, comme un château fort (douves, murailles, gardes, coffre-fort). Si une couche cède, les autres protègent encore.</p>
<p>Couches : données (chiffrement) → application (WAF) → instance (Security Group, correctifs) → réseau (NACL, VPC privé) → périmètre (Shield, CloudFront) → identité (IAM, MFA) → physique (AWS).</p>`,
exam:`<table><tr><th>Catégorie</th><th>Services</th></tr>
<tr><td>Identité & accès</td><td>IAM, Identity Center, Cognito, Directory Service, Organizations (SCP), RAM</td></tr>
<tr><td>Détection</td><td><b>GuardDuty</b> (menaces), <b>Inspector</b> (vulnérabilités), <b>Macie</b> (données sensibles S3), <b>Detective</b> (enquête), <b>Security Hub</b> (centralisation), Config, CloudTrail, Security Lake</td></tr>
<tr><td>Protection réseau/applis</td><td><b>Shield</b> (DDoS), <b>WAF</b>, Firewall Manager, Network Firewall, Security Groups, NACL</td></tr>
<tr><td>Protection des données</td><td><b>KMS</b>, <b>CloudHSM</b>, <b>Secrets Manager</b>, <b>ACM</b>, Macie</td></tr>
<tr><td>Conformité</td><td><b>Artifact</b>, Audit Manager, Config</td></tr>
<tr><td>Réponse aux incidents</td><td>Detective, Security Hub, EventBridge + Lambda (remédiation auto)</td></tr></table>
<h4>Chiffrement</h4><ul><li><b>Au repos</b> : KMS (S3, EBS, RDS…), clés gérées par AWS ou par le client (CMK).</li>
<li><b>En transit</b> : TLS/HTTPS (certificats ACM), VPN IPsec.</li>
<li>Côté client : tu chiffres avant d’envoyer.</li></ul>
<h4>Conformité</h4><p>AWS est certifié pour de nombreux programmes : <b>ISO 27001, SOC 1/2/3, PCI DSS, HIPAA, RGPD, FedRAMP</b>… Mais une infra conforme ne rend pas ton appli conforme automatiquement (responsabilité partagée !).</p>`,
pro:`<ul><li>Shield Standard = gratuit, automatique pour tous (couches 3/4). Shield Advanced = ~3000 $/mois, SRT, protection des coûts, couche 7 avec WAF.</li>
<li>Meilleure défense DDoS : CloudFront + Route 53 + Shield + WAF + Auto Scaling.</li>
<li>KMS : <b>rotation automatique</b> annuelle possible ; journal de chaque utilisation de clé dans CloudTrail.</li>
<li>Tests d’intrusion : autorisés sans demande préalable pour une liste de services (EC2, RDS, Lambda…) ; interdits : DoS/DDoS, inondation de ports, attaques de zones DNS Route 53.</li>
<li><b>Security Hub</b> agrège GuardDuty, Inspector, Macie, Firewall Manager… et vérifie les normes (CIS, PCI, AWS Foundational Security Best Practices).</li>
<li>« Équipe AWS Trust & Safety » pour signaler des abus ; <b>AWS Security Bulletins</b> pour les vulnérabilités publiées.</li></ul>`,
q:[
{q:"Quel service centralise les alertes de GuardDuty, Inspector et Macie dans un seul tableau de bord ?",o:["AWS Security Hub","Amazon Detective","AWS Config","AWS Shield"],a:[0],e:["Exact.","Enquête sur un incident, pas un agrégateur central.","Conformité de configuration.","DDoS."]},
{q:"Quelle activité nécessite une approbation ou est interdite lors de tests de sécurité sur AWS ?",o:["Scanner ses propres instances EC2","Simuler une attaque DDoS sans autorisation","Tester ses propres fonctions Lambda","Tester sa propre base RDS"],a:[1],e:["Autorisé sans demande préalable.","Exact : les tests DoS/DDoS sont interdits sans accord/partenaire approuvé.","Autorisé.","Autorisé."]},
{q:"Quel service fournit gratuitement des certificats SSL/TLS publics pour un équilibreur de charge ?",o:["AWS KMS","AWS Certificate Manager","AWS Secrets Manager","Amazon Cognito"],a:[1],e:["Gère des clés de chiffrement, pas des certificats.","Exact.","Stocke des secrets.","Identité utilisateurs."]}]},

{n:29,t:"Comparer les services semblables",v:"29_comparer_les_services_semblables.mp4",d:3,
zero:`<p>L’examen adore proposer <b>deux services qui se ressemblent</b> pour voir si tu sais les distinguer. La meilleure technique : pour chaque paire, retiens <b>un mot-clé unique</b>. Ce chapitre rassemble les comparaisons les plus fréquentes — voir aussi l’onglet <b>Pièges</b> pour le tableau complet.</p>`,
exam:`<table><tr><th>Paire</th><th>Mot-clé qui tranche</th></tr>
<tr><td>CloudTrail / CloudWatch / Config</td><td><b>Qui</b> / <b>Performance</b> / <b>Configuration</b></td></tr>
<tr><td>GuardDuty / Inspector / Macie / Detective</td><td><b>Menaces</b> / <b>Vulnérabilités</b> / <b>Données sensibles S3</b> / <b>Enquête</b></td></tr>
<tr><td>Shield / WAF</td><td><b>DDoS</b> / <b>SQLi-XSS (couche 7)</b></td></tr>
<tr><td>KMS / CloudHSM</td><td><b>Géré, partagé</b> / <b>Matériel dédié</b></td></tr>
<tr><td>SQS / SNS / EventBridge</td><td><b>File</b> / <b>Notification</b> / <b>Événements & règles</b></td></tr>
<tr><td>EBS / EFS / S3 / FSx</td><td><b>Bloc 1 instance</b> / <b>Fichiers Linux partagés</b> / <b>Objet</b> / <b>Fichiers Windows ou HPC</b></td></tr>
<tr><td>RDS / Aurora / DynamoDB / Redshift</td><td><b>SQL classique</b> / <b>SQL haute perf AWS</b> / <b>NoSQL</b> / <b>Entrepôt</b></td></tr>
<tr><td>VPN / Direct Connect</td><td><b>Internet chiffré, rapide</b> / <b>Privé dédié</b></td></tr>
<tr><td>CloudFront / Global Accelerator</td><td><b>Cache</b> / <b>Routage IP, pas de cache</b></td></tr>
<tr><td>Beanstalk / CloudFormation</td><td><b>Appli</b> / <b>Infrastructure</b></td></tr>
<tr><td>ECS / EKS / Fargate</td><td><b>Orchestrateur AWS</b> / <b>Kubernetes</b> / <b>Sans serveur</b></td></tr>
<tr><td>Cognito / Identity Center</td><td><b>Clients de l’appli</b> / <b>Employés</b></td></tr>
<tr><td>Artifact / Audit Manager</td><td><b>Rapports d’AWS</b> / <b>Tes audits</b></td></tr>
<tr><td>Budgets / Cost Explorer / Pricing Calculator</td><td><b>Alerte</b> / <b>Analyse</b> / <b>Estimation</b></td></tr>
<tr><td>Trusted Advisor / Health Dashboard</td><td><b>Recommandations</b> / <b>Incidents AWS</b></td></tr>
<tr><td>Bedrock / SageMaker</td><td><b>Modèles existants (génératif)</b> / <b>Tes modèles</b></td></tr>
<tr><td>Transcribe / Polly / Translate / Comprehend</td><td><b>Voix→texte</b> / <b>Texte→voix</b> / <b>Langue→langue</b> / <b>Sens du texte</b></td></tr>
<tr><td>Outposts / Local Zones / Wavelength</td><td><b>Chez toi</b> / <b>Près d’une ville</b> / <b>Réseau 5G</b></td></tr></table>`,
pro:`<ul><li>Quand deux réponses semblent justes, cherche le <b>critère</b> de la question : coût, effort, rapidité de mise en place, sécurité, échelle.</li>
<li>Méfie-toi des réponses qui <b>fonctionneraient</b> mais ne sont pas <b>les plus adaptées</b> : l’examen veut la meilleure option, pas une option possible.</li>
<li>Exercice pro : pour chaque paire ci-dessus, essaie d’inventer un scénario où l’un est meilleur que l’autre. Si tu y arrives pour toutes les lignes, tu es prêt(e).</li>
<li>Termine avec l’<b>examen blanc</b> complet (onglet du haut) et vise 80 %+.</li></ul>`,
q:[
{q:"Une entreprise veut mettre en cache des vidéos près de ses utilisateurs mondiaux. Laquelle choisir ?",o:["AWS Global Accelerator","Amazon CloudFront","AWS Direct Connect","Amazon Route 53"],a:[1],e:["N’effectue pas de mise en cache.","Exact : CDN avec cache.","Liaison privée vers ton datacenter.","DNS, pas de cache de contenu."]},
{q:"Qui utilise Amazon Cognito ?",o:["Les employés qui administrent les comptes AWS","Les utilisateurs finaux d’une application web ou mobile","Les auditeurs qui veulent des rapports SOC","Les instances EC2 qui accèdent à S3"],a:[1],e:["C’est IAM / Identity Center.","Exact.","C’est Artifact.","C’est un rôle IAM."]},
{q:"Quel trio répond respectivement à : estimer avant, analyser après, être alerté ?",o:["Cost Explorer, Budgets, Pricing Calculator","Pricing Calculator, Cost Explorer, Budgets","Budgets, Pricing Calculator, Cost Explorer","Trusted Advisor, CUR, Budgets"],a:[1],e:["Ordre incorrect.","Exact.","Ordre incorrect.","Trusted Advisor n’estime pas un coût futur."]}]}
);
