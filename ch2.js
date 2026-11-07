window.CH = window.CH || [];
CH.push(
{n:11,t:"Le stockage",v:"11_le_stockage.mp4",d:3,
zero:`<p>Trois façons de ranger des données :</p><ul>
<li>📦 <b>Objet</b> (S3) : un entrepôt géant où chaque fichier est une boîte avec une étiquette. Illimité, accessible par URL. Idéal pour photos, vidéos, sauvegardes.</li>
<li>💽 <b>Bloc</b> (EBS) : le disque dur branché à <i>un</i> ordinateur. Rapide, pour l’OS et les bases de données.</li>
<li>📁 <b>Fichiers</b> (EFS, FSx) : un dossier réseau partagé, plusieurs ordinateurs y accèdent en même temps.</li></ul>`,
exam:`<table><tr><th>Service</th><th>Type</th><th>Points-clés</th></tr>
<tr><td><b>S3</b></td><td>Objet</td><td>Buckets, objets jusqu’à 5 To, illimité, <b>11 neuf de durabilité</b>, régional, site web statique, versioning, réplication, cycle de vie</td></tr>
<tr><td><b>EBS</b></td><td>Bloc</td><td>Attaché à une EC2, <b>une seule AZ</b>, persiste après arrêt, <b>snapshots</b> (stockés dans S3)</td></tr>
<tr><td><b>Instance Store</b></td><td>Bloc</td><td>Disque physique de l’hôte, très rapide, <b>éphémère</b></td></tr>
<tr><td><b>EFS</b></td><td>Fichiers (NFS)</td><td><b>Linux</b>, partagé, multi-AZ, grandit automatiquement</td></tr>
<tr><td><b>FSx</b></td><td>Fichiers</td><td>Windows File Server (SMB, AD), Lustre (calcul haute performance), NetApp ONTAP, OpenZFS</td></tr>
<tr><td><b>Storage Gateway</b></td><td>Hybride</td><td>File Gateway, Volume Gateway, Tape Gateway (remplacer les bandes)</td></tr>
<tr><td><b>AWS Backup</b></td><td>—</td><td>Politiques de sauvegarde centralisées (EBS, RDS, DynamoDB, EFS…)</td></tr>
<tr><td><b>Snow Family</b></td><td>Transfert physique</td><td>Snowcone (petit), Snowball Edge (To→Po, calcul en périphérie)</td></tr></table>
<h4>Classes S3</h4>
<table><tr><th>Classe</th><th>Pour</th></tr>
<tr><td>Standard</td><td>Accès fréquent</td></tr>
<tr><td>Intelligent-Tiering</td><td>Accès inconnu ou changeant → automatique</td></tr>
<tr><td>Standard-IA</td><td>Rarement lu mais besoin immédiat</td></tr>
<tr><td>One Zone-IA</td><td>Rarement lu, recréable (1 AZ, moins cher)</td></tr>
<tr><td>Glacier Instant Retrieval</td><td>Archive lue ~1×/trimestre, accès en ms</td></tr>
<tr><td>Glacier Flexible Retrieval</td><td>Archive, minutes → 12 h</td></tr>
<tr><td>Glacier Deep Archive</td><td>Archive la moins chère, 12–48 h</td></tr></table>`,
pro:`<ul><li><b>Politiques de cycle de vie S3</b> : déplacer automatiquement les objets vers des classes moins chères après X jours, ou les supprimer.</li>
<li><b>Versioning</b> protège contre les suppressions accidentelles ; <b>MFA Delete</b> ajoute une protection ; <b>Object Lock</b> = WORM (conformité, impossible à modifier).</li>
<li><b>S3 Transfer Acceleration</b> : upload rapide depuis loin via les edge locations.</li>
<li>Sécurité S3 : <b>Block Public Access</b> activé par défaut, politiques de bucket, chiffrement par défaut (SSE-S3), SSE-KMS pour contrôler les clés.</li>
<li>Durabilité (ne pas perdre) ≠ disponibilité (pouvoir y accéder). S3 Standard : 11 neuf de durabilité, 99,99 % de disponibilité.</li>
<li>EBS ne peut pas être attaché à une instance d’une autre AZ directement : on fait un snapshot puis on crée un volume dans l’autre AZ.</li></ul>`,
q:[
{q:"Une entreprise veut héberger un site web statique (HTML, images) de façon économique et sans serveur. Quel service ?",o:["Amazon EBS","Amazon S3","Amazon EFS","Instance Store"],a:[1],e:["EBS doit être attaché à une instance.","Exact : S3 peut servir un site web statique (souvent avec CloudFront).","EFS est un système de fichiers pour instances.","Éphémère et lié à une instance."]},
{q:"Une entreprise veut remplacer ses bandes magnétiques de sauvegarde sur site par du stockage cloud, sans changer son logiciel de sauvegarde. Quel service ?",o:["AWS Storage Gateway (Tape Gateway)","Amazon EFS","AWS Snowcone","Amazon FSx for Lustre"],a:[0],e:["Exact : Tape Gateway présente des bandes virtuelles stockées dans S3/Glacier.","EFS est un système de fichiers NFS.","Snowcone sert au transfert physique ponctuel.","Lustre sert au calcul haute performance."]},
{q:"Quelle fonctionnalité S3 déplace automatiquement les objets vers Glacier après 90 jours ?",o:["Versioning","Politique de cycle de vie","Transfer Acceleration","Réplication inter-régions"],a:[1],e:["Le versioning garde les anciennes versions.","Exact.","Accélère les uploads.","Copie dans une autre région, ne change pas de classe."]}]},

{n:12,t:"Les bases de données",v:"12_les_bases_de_donnees.mp4",d:3,
zero:`<p>Une base de données range des informations pour les retrouver vite. Deux grandes familles :</p><ul>
<li><b>Relationnelle (SQL)</b> : des tableaux avec lignes et colonnes liés entre eux, comme un Excel très strict (clients ↔ commandes).</li>
<li><b>NoSQL</b> : formats plus libres (clé-valeur, documents JSON, graphes), conçus pour une énorme échelle et une grande vitesse.</li></ul>
<p>Sur AWS, tu peux installer ta BD sur EC2 (tu fais tout) ou prendre une <b>BD managée</b> (AWS fait les sauvegardes, correctifs, réplication).</p>`,
exam:`<table><tr><th>Besoin</th><th>Service</th></tr>
<tr><td>Relationnel managé (MySQL, PostgreSQL, MariaDB, Oracle, SQL Server, Db2)</td><td><b>RDS</b></td></tr>
<tr><td>Relationnel haute performance cloud-native</td><td><b>Aurora</b> (compatible MySQL/PostgreSQL ; Aurora Serverless)</td></tr>
<tr><td>NoSQL clé-valeur, serverless, latence en ms</td><td><b>DynamoDB</b> (DAX = cache µs)</td></tr>
<tr><td>Cache en mémoire</td><td><b>ElastiCache</b> (Redis/Valkey/Memcached), MemoryDB</td></tr>
<tr><td>Entrepôt de données / analytique</td><td><b>Redshift</b></td></tr>
<tr><td>Documents (MongoDB)</td><td><b>DocumentDB</b></td></tr>
<tr><td>Graphe (relations, fraude, réseaux sociaux)</td><td><b>Neptune</b></td></tr>
<tr><td>Cassandra</td><td><b>Keyspaces</b></td></tr>
<tr><td>Séries temporelles (IoT)</td><td><b>Timestream</b></td></tr>
<tr><td>Migration de BD</td><td><b>DMS</b> (+ Schema Conversion Tool)</td></tr></table>`,
pro:`<ul><li><b>RDS Multi-AZ</b> = copie synchrone en attente dans une autre AZ → <b>disponibilité</b> / basculement automatique. <b>Read Replicas</b> = copies asynchrones pour <b>performances en lecture</b>. Ne pas confondre !</li>
<li><b>OLTP</b> (transactions : panier, banque) → RDS/Aurora/DynamoDB. <b>OLAP</b> (analyse de gros volumes) → Redshift.</li>
<li>DynamoDB <b>Global Tables</b> : réplication multi-région active-active.</li>
<li>Aurora : stockage répliqué 6 fois sur 3 AZ, jusqu’à 5× plus rapide que MySQL standard.</li>
<li>BD sur EC2 se justifie si on a besoin d’un accès root à l’OS de la BD ou d’un moteur non supporté par RDS.</li>
<li>Migration Oracle → Aurora PostgreSQL = migration <b>hétérogène</b> : SCT convertit le schéma, DMS copie les données.</li></ul>`,
q:[
{q:"Quelle fonctionnalité RDS améliore la DISPONIBILITÉ en cas de panne d’une AZ ?",o:["Read Replicas","Multi-AZ","ElastiCache","Snapshots manuels"],a:[1],e:["Les réplicas en lecture améliorent les performances de lecture.","Exact : basculement automatique vers l’instance de secours.","Cache, pas de basculement de BD.","Une restauration prend du temps : pas de disponibilité automatique."]},
{q:"Une appli de détection de fraude doit analyser des relations complexes entre comptes, appareils et transactions. Quel service ?",o:["Amazon Neptune","Amazon Redshift","Amazon RDS","Amazon Timestream"],a:[0],e:["Exact : base graphe pour les relations.","Entrepôt analytique, pas optimisé pour les relations en graphe.","Possible mais peu efficace pour des parcours de graphe.","Séries temporelles."]},
{q:"Une entreprise veut migrer son application MongoDB vers un service managé compatible. Quel service ?",o:["Amazon DynamoDB","Amazon DocumentDB","Amazon Keyspaces","Amazon Aurora"],a:[1],e:["NoSQL mais pas compatible avec l’API MongoDB.","Exact.","Compatible Cassandra.","Relationnel."]}]},

{n:13,t:"Le réseau",v:"13_le_reseau.mp4",d:3,
zero:`<p>Un <b>VPC</b> (Virtual Private Cloud), c’est ton <b>quartier privé</b> dans AWS. Tu le découpes en <b>rues (sous-réseaux)</b> : certaines donnent sur la grande route (Internet) — sous-réseaux <b>publics</b> — d’autres sont des impasses protégées — sous-réseaux <b>privés</b> (pour tes bases de données).</p>
<p>La <b>porte d’entrée</b> vers Internet s’appelle l’<b>Internet Gateway</b>. Les <b>gardiens</b> sont les Security Groups (à la porte de chaque maison) et les Network ACL (à l’entrée de chaque rue).</p>`,
exam:`<table><tr><th>Élément</th><th>Rôle</th></tr>
<tr><td><b>VPC</b></td><td>Réseau virtuel isolé, dans une région</td></tr>
<tr><td><b>Sous-réseau</b></td><td>Plage d’IP dans <b>une AZ</b> ; public ou privé</td></tr>
<tr><td><b>Internet Gateway</b></td><td>Accès Internet du VPC (entrée + sortie)</td></tr>
<tr><td><b>NAT Gateway</b></td><td>Sortie Internet pour sous-réseaux privés (pas d’entrée)</td></tr>
<tr><td>Table de routage</td><td>Indique où envoyer le trafic</td></tr>
<tr><td><b>Security Group</b></td><td>Pare-feu d’instance, stateful, autorisations seulement</td></tr>
<tr><td><b>Network ACL</b></td><td>Pare-feu de sous-réseau, stateless, allow + deny</td></tr>
<tr><td><b>Site-to-Site VPN</b></td><td>Tunnel IPsec chiffré via Internet</td></tr>
<tr><td>Client VPN</td><td>Connexion des employés à distance</td></tr>
<tr><td><b>Direct Connect</b></td><td>Lien physique privé dédié (1–100 Gbit/s)</td></tr>
<tr><td>VPC Peering</td><td>Relier 2 VPC</td></tr>
<tr><td><b>Transit Gateway</b></td><td>Hub pour relier des milliers de VPC et réseaux sur site</td></tr>
<tr><td>PrivateLink / VPC Endpoints</td><td>Accéder à S3/DynamoDB ou à un service sans passer par Internet</td></tr>
<tr><td><b>Route 53</b></td><td>DNS, domaines, health checks, politiques de routage</td></tr>
<tr><td><b>CloudFront</b></td><td>CDN</td></tr>
<tr><td>Global Accelerator</td><td>2 IP anycast fixes, routage via le réseau AWS</td></tr>
<tr><td>API Gateway</td><td>Porte d’entrée pour API</td></tr></table>`,
pro:`<ul><li><b>Sous-réseau public</b> = sa table de routage pointe vers une Internet Gateway. C’est la seule différence technique.</li>
<li>Architecture classique 3 tiers : ALB dans sous-réseaux publics, EC2 dans privés, RDS dans privés, sur 2+ AZ.</li>
<li>VPN = rapide (heures), pas cher, mais performances variables. Direct Connect = semaines, plus cher, constant, privé. <b>Souvent combinés</b> : VPN en secours de Direct Connect.</li>
<li>Route 53 politiques : simple, pondéré (tests A/B), latence, basculement, géolocalisation, géoproximité, multivaleur.</li>
<li><b>VPC Flow Logs</b> : journal du trafic IP du VPC (analyse, sécurité).</li>
<li>Le trafic EC2 → S3 via un <b>Gateway Endpoint</b> ne passe pas par Internet et évite les frais de NAT.</li></ul>`,
q:[
{q:"Des instances dans un sous-réseau privé doivent télécharger des mises à jour sur Internet sans être joignables depuis Internet. Quoi utiliser ?",o:["Internet Gateway directement","NAT Gateway","Direct Connect","VPC Peering"],a:[1],e:["Rendrait le sous-réseau public et les instances potentiellement joignables.","Exact : sortie seulement.","Relie à ton datacenter, pas à Internet.","Relie deux VPC."]},
{q:"Quel élément est STATELESS et peut contenir des règles de refus ?",o:["Security Group","Network ACL","Internet Gateway","Route 53"],a:[1],e:["Stateful, autorisations seulement.","Exact.","Ce n’est pas un pare-feu.","C’est un DNS."]},
{q:"Une entreprise a besoin d’une connexion chiffrée vers AWS opérationnelle aujourd’hui même. Quelle option ?",o:["AWS Direct Connect","AWS Site-to-Site VPN","Amazon CloudFront","Transit Gateway seul"],a:[1],e:["Plusieurs semaines d’installation.","Exact : se configure en quelques heures via Internet.","CDN.","Hub de routage ; il faut quand même un VPN ou Direct Connect pour le site."]}]},

{n:14,t:"EC2 en détail",v:"14_ec2_en_detail.mp4",d:3,
zero:`<p>Une instance EC2, c’est un <b>ordinateur virtuel</b>. Pour la créer, tu choisis :</p><ol>
<li>une <b>image (AMI)</b> : le système déjà installé (Linux, Windows) ;</li>
<li>un <b>type d’instance</b> : la puissance (CPU, mémoire) ;</li>
<li>un <b>disque</b> (EBS) ;</li>
<li>un <b>pare-feu</b> (Security Group) ;</li>
<li>une <b>paire de clés</b> pour te connecter.</li></ol>`,
exam:`<h4>Lire un type d’instance : <code>m7g.xlarge</code></h4>
<p><b>m</b> = famille · <b>7</b> = génération · <b>g</b> = attribut (Graviton/ARM) · <b>xlarge</b> = taille</p>
<table><tr><th>Famille</th><th>Lettres</th><th>Pour</th></tr>
<tr><td>Usage général</td><td>T, M</td><td>Web, équilibré (T = burstable, économique)</td></tr>
<tr><td>Optimisé calcul</td><td>C</td><td>Calcul intensif, serveurs de jeux, encodage</td></tr>
<tr><td>Optimisé mémoire</td><td>R, X</td><td>BD en mémoire, gros caches</td></tr>
<tr><td>Calcul accéléré</td><td>P, G, Inf, Trn</td><td>GPU : ML, graphisme</td></tr>
<tr><td>Optimisé stockage</td><td>I, D, H</td><td>E/S disque élevées, entrepôts</td></tr>
<tr><td>HPC</td><td>Hpc</td><td>Calcul scientifique</td></tr></table>
<h4>Autres notions</h4><ul>
<li><b>AMI</b> : modèle d’instance (OS + logiciels). AWS, Marketplace, communauté ou la tienne.</li>
<li><b>User Data</b> : script exécuté au premier démarrage (installer un serveur web).</li>
<li><b>Elastic IP</b> : IP publique fixe (payante, y compris quand elle est attachée depuis 2024).</li>
<li><b>Paire de clés</b> : SSH (Linux) / mot de passe (Windows). Alternatives : EC2 Instance Connect, Session Manager.</li>
<li>États : pending → running → stopping/stopped → terminated. Instance <b>stoppée</b> = pas de frais de calcul, mais <b>EBS facturé</b>.</li></ul>`,
pro:`<ul><li>« Charge mémoire intensive (SAP HANA, Redis géant) » → <b>R/X</b>. « Encodage vidéo, HPC » → <b>C</b>. « Entraîner un modèle de deep learning » → <b>P</b> ou Trainium.</li>
<li><b>Graviton</b> (ARM, suffixe g) : jusqu’à ~40 % meilleur rapport prix/performance.</li>
<li><b>Placement groups</b> : cluster (faible latence, même AZ), spread (matériel différent), partition (Hadoop).</li>
<li><b>Hibernation</b> : garde la RAM sur EBS pour redémarrer plus vite.</li>
<li><b>Instance Metadata</b> (169.254.169.254) : l’instance peut connaître ses propres infos ; un rôle IAM y fournit les identifiants temporaires.</li>
<li><b>Launch Template</b> : modèle de lancement réutilisé par Auto Scaling.</li>
<li><b>Compute Optimizer</b> recommande la bonne taille selon l’usage réel (rightsizing).</li></ul>`,
q:[
{q:"Quelle famille d’instances convient à une base de données en mémoire volumineuse ?",o:["C (optimisé calcul)","R (optimisé mémoire)","T (burstable)","I (optimisé stockage)"],a:[1],e:["Le calcul n’est pas le facteur limitant ici.","Exact.","Pour charges légères et irrégulières.","Pour des E/S disque intensives, pas la RAM."]},
{q:"Quel élément contient le système d’exploitation et les logiciels utilisés pour lancer une instance ?",o:["Security Group","AMI","Elastic IP","EBS Snapshot uniquement"],a:[1],e:["C’est un pare-feu.","Exact : Amazon Machine Image.","IP fixe.","Un snapshot sauvegarde un volume ; l’AMI est le modèle de lancement (elle s’appuie sur des snapshots)."]},
{q:"Une instance EC2 avec un volume EBS est ARRÊTÉE (stopped). Qu’est-ce qui est encore facturé ?",o:["Le calcul de l’instance","Le stockage EBS","Rien du tout","Le transfert de données entrant"],a:[1],e:["Plus facturé à l’arrêt.","Exact : le volume existe toujours.","Le stockage reste facturé.","L’entrant est gratuit de toute façon."]}]},

{n:15,t:"Modèles de prix EC2",v:"15_modeles_de_prix_ec2.mp4",d:4,
zero:`<p>Comme pour une chambre d’hôtel :</p><ul>
<li><b>On-Demand</b> = tu paies la nuit au prix affiché, sans engagement.</li>
<li><b>Reserved / Savings Plans</b> = abonnement d’1 ou 3 ans → grosse réduction.</li>
<li><b>Spot</b> = chambre invendue à -90 %, mais l’hôtel peut te demander de partir avec 2 min de préavis.</li>
<li><b>Dedicated Host</b> = tu loues tout l’étage pour toi seul.</li></ul>`,
exam:`<table><tr><th>Modèle</th><th>Réduction</th><th>Engagement</th><th>Idéal pour</th></tr>
<tr><td>On-Demand</td><td>—</td><td>Aucun, facturé à la seconde (Linux)</td><td>Court terme, imprévisible, tests</td></tr>
<tr><td>Reserved Instances (Standard)</td><td>jusqu’à ~72 %</td><td>1 ou 3 ans, type d’instance fixe</td><td>Charge stable (BD 24/7)</td></tr>
<tr><td>Convertible RI</td><td>jusqu’à ~66 %</td><td>1 ou 3 ans, peut changer de famille</td><td>Stable mais besoin de flexibilité</td></tr>
<tr><td>Compute Savings Plans</td><td>jusqu’à ~66 %</td><td>$/heure sur 1–3 ans</td><td>Le plus flexible : EC2, Fargate, Lambda, toute région</td></tr>
<tr><td>EC2 Instance Savings Plans</td><td>jusqu’à ~72 %</td><td>$/h, une famille dans une région</td><td>Famille connue</td></tr>
<tr><td>Spot</td><td>jusqu’à ~90 %</td><td>Aucun, interruptible (avis 2 min)</td><td>Batch, CI, big data, sans état</td></tr>
<tr><td>Dedicated Hosts</td><td>—</td><td>On-demand ou réservé</td><td>Licences par cœur/socket (BYOL), conformité</td></tr>
<tr><td>Dedicated Instances</td><td>—</td><td>—</td><td>Matériel non partagé</td></tr>
<tr><td>Capacity Reservations</td><td>—</td><td>Aucun terme</td><td>Garantir de la capacité dans une AZ</td></tr></table>
<p>Options de paiement RI/SP : <b>All Upfront</b> (rabais max) &gt; Partial Upfront &gt; No Upfront.</p>`,
pro:`<ul><li>Mix optimal en entreprise : base stable en <b>Savings Plans/RI</b> + pics en <b>On-Demand</b> + traitements tolérants en <b>Spot</b>.</li>
<li>Les RI non utilisées peuvent être revendues sur le <b>Reserved Instance Marketplace</b> (Standard seulement).</li>
<li>Les RI s’appliquent automatiquement aux instances qui correspondent ; avec la facturation consolidée, elles sont <b>partagées entre comptes</b>.</li>
<li>Dedicated Host vs Dedicated Instance : seul le <b>Host</b> donne la visibilité sur sockets/cœurs → licences.</li>
<li>Spot ne convient pas à une BD de production ni à une appli critique avec état.</li>
<li>Recommandations d’achat RI/SP : <b>Cost Explorer</b>.</li></ul>`,
q:[
{q:"Une entreprise veut une réduction sur 3 ans qui s’applique aussi à Fargate et Lambda, quelle que soit la région. Quel modèle ?",o:["Standard Reserved Instances","Compute Savings Plans","EC2 Instance Savings Plans","Spot"],a:[1],e:["Les RI ne s’appliquent qu’à EC2 (et à une config précise).","Exact : le plus flexible.","Limité à une famille EC2 dans une région.","Pas d’engagement, et ne s’applique pas à Lambda."]},
{q:"Quelle option de paiement offre le plus grand rabais sur une Reserved Instance ?",o:["No Upfront","Partial Upfront","All Upfront","On-Demand"],a:[2],e:["Rabais le plus faible des trois.","Intermédiaire.","Exact : tout payer d’avance = rabais maximal.","Pas une option de paiement RI."]},
{q:"Une application de rendu d’images peut être arrêtée à tout moment et reprise. Quel modèle minimise les coûts ?",o:["Spot","On-Demand","Dedicated Hosts","Reserved Instances"],a:[0],e:["Exact : jusqu’à 90 % de rabais, et l’interruption est acceptable.","Plus cher.","Le plus cher.","Engagement inutile pour une charge flexible."]}]},

{n:16,t:"L’identité",v:"16_l_identite.mp4",d:2,
zero:`<p>L’identité répond à deux questions : <b>« Qui es-tu ? »</b> (authentification : mot de passe + MFA) et <b>« Qu’as-tu le droit de faire ? »</b> (autorisation : permissions).</p>
<p>Dans AWS, c’est <b>IAM</b> qui gère ça. On donne des <b>badges</b> (utilisateurs), on les regroupe par <b>équipe</b> (groupes), on crée des <b>badges temporaires</b> pour les visiteurs ou les machines (rôles), et on écrit le <b>règlement</b> (politiques).</p>`,
exam:`<table><tr><th>Élément IAM</th><th>À retenir</th></tr>
<tr><td>Utilisateur</td><td>Identité permanente (personne ou appli). Mot de passe console et/ou clés d’accès.</td></tr>
<tr><td>Groupe</td><td>Collection d’utilisateurs ; on attache les politiques au groupe.</td></tr>
<tr><td><b>Rôle</b></td><td>Identifiants <b>temporaires</b> pour services AWS, autres comptes, utilisateurs fédérés.</td></tr>
<tr><td>Politique</td><td>JSON : <code>Effect</code> (Allow/Deny), <code>Action</code>, <code>Resource</code>, <code>Condition</code>. Gérées par AWS, gérées par le client, ou en ligne.</td></tr></table>
<p><b>Règle d’évaluation</b> : tout est refusé par défaut → un <b>Allow</b> explicite autorise → un <b>Deny</b> explicite gagne toujours.</p>
<table><tr><th>Autres services d’identité</th><th>Pour</th></tr>
<tr><td><b>IAM Identity Center</b></td><td>SSO des employés vers plusieurs comptes AWS et applis</td></tr>
<tr><td><b>Cognito</b></td><td>Utilisateurs finaux de tes applis web/mobiles</td></tr>
<tr><td><b>Directory Service</b></td><td>Microsoft Active Directory managé (ou AD Connector)</td></tr>
<tr><td><b>IAM Access Analyzer</b></td><td>Repérer les ressources partagées à l’extérieur ; générer des politiques moindre privilège</td></tr>
<tr><td>Credential Report / Access Advisor</td><td>Audit des identifiants / services réellement utilisés</td></tr></table>`,
pro:`<ul><li><b>Fédération</b> : utiliser des identités existantes (AD, Okta, Google) via SAML 2.0/OIDC sans créer d’utilisateurs IAM.</li>
<li>Bonnes pratiques : MFA partout, identifiants temporaires (rôles) plutôt que des clés à long terme, rotation des clés, moindre privilège, supprimer les identifiants inutilisés.</li>
<li>Types de MFA : application d’authentification, clé de sécurité FIDO2 (passkey), jeton matériel TOTP.</li>
<li>Politique <b>basée sur l’identité</b> (attachée à un utilisateur/rôle) vs <b>basée sur la ressource</b> (attachée à un bucket S3, une file SQS).</li>
<li>Limites : <b>Permissions boundary</b> (plafond par utilisateur/rôle), <b>SCP</b> (plafond par compte).</li>
<li>Accès inter-comptes : un rôle dans le compte B que le compte A peut « assumer » (STS AssumeRole).</li></ul>`,
q:[
{q:"Une politique IAM autorise s3:* mais une autre politique attachée au même utilisateur refuse explicitement s3:DeleteObject. Résultat ?",o:["L’utilisateur peut tout faire sur S3","L’utilisateur peut tout faire sauf supprimer des objets","L’utilisateur ne peut rien faire sur S3","Cela dépend de l’ordre des politiques"],a:[1],e:["Le Deny explicite s’applique.","Exact : un Deny explicite l’emporte sur un Allow.","Le reste de l’Allow reste valable.","L’ordre n’a aucune importance dans IAM."]},
{q:"Une entreprise veut que ses employés se connectent une seule fois pour accéder à 20 comptes AWS. Quel service ?",o:["Amazon Cognito","IAM Identity Center","IAM Access Analyzer","AWS Directory Service seul"],a:[1],e:["Pour les utilisateurs de tes applis, pas les employés sur AWS.","Exact : authentification unique multi-comptes.","Analyse les accès, pas de SSO.","Fournit un AD ; c’est Identity Center qui fait le SSO vers les comptes."]},
{q:"Quelle est la meilleure façon de donner à une fonction Lambda l’accès à DynamoDB ?",o:["Écrire des clés d’accès dans les variables d’environnement","Utiliser un rôle d’exécution IAM","Utiliser l’utilisateur root","Rendre la table publique"],a:[1],e:["Risque de fuite et pas de rotation automatique.","Exact.","Jamais.","Impossible et dangereux."]}]},

{n:17,t:"Intégration d’applications",v:"17_integration_d_applications.mp4",d:3,
zero:`<p>Dans une grande application, les morceaux doivent se parler. Si chaque morceau appelle directement les autres, une panne fait tout tomber (couplage fort).</p>
<p>Solution : des <b>intermédiaires</b>. Une <b>file d’attente</b> (comme une boîte aux lettres : on dépose, quelqu’un vient chercher plus tard), un <b>système de notifications</b> (comme une alerte envoyée à tous les abonnés), un <b>bus d’événements</b> (un standard téléphonique qui redirige).</p>`,
exam:`<table><tr><th>Service</th><th>Modèle</th><th>Exemple</th></tr>
<tr><td><b>SQS</b></td><td>File d’attente (pull), découplage, tampon</td><td>Commandes en attente de traitement</td></tr>
<tr><td><b>SNS</b></td><td>Pub/sub (push) vers plusieurs abonnés : email, SMS, HTTP, Lambda, SQS</td><td>Alerter l’équipe, fan-out</td></tr>
<tr><td><b>EventBridge</b></td><td>Bus d’événements, règles, planification (cron), événements SaaS</td><td>« Quand une instance s’arrête, lancer une Lambda »</td></tr>
<tr><td><b>Step Functions</b></td><td>Orchestration de workflows visuels</td><td>Commande : payer → stock → expédier</td></tr>
<tr><td><b>API Gateway</b></td><td>Créer des API REST/WebSocket</td><td>Front d’API pour Lambda</td></tr>
<tr><td><b>Amazon MQ</b></td><td>Brokers ActiveMQ/RabbitMQ managés</td><td>Migrer une appli existante utilisant ces protocoles</td></tr>
<tr><td><b>Kinesis</b></td><td>Flux de données temps réel</td><td>Clics, logs, IoT en continu</td></tr>
<tr><td>AppFlow</td><td>Transférer des données entre SaaS (Salesforce) et AWS</td><td>Synchro CRM → S3</td></tr></table>`,
pro:`<ul><li><b>SQS Standard</b> : débit quasi illimité, au moins une fois, ordre non garanti. <b>SQS FIFO</b> : ordre garanti, exactement une fois.</li>
<li><b>Fan-out</b> : SNS → plusieurs files SQS (chaque système reçoit sa copie).</li>
<li>SQS rend le système <b>plus résilient</b> : si le consommateur tombe, les messages attendent (rétention jusqu’à 14 jours).</li>
<li>Migration d’une appli existante utilisant JMS/AMQP/MQTT → <b>Amazon MQ</b> (pas besoin de réécrire). Nouvelle appli cloud-native → SQS/SNS.</li>
<li>« Découpler » sur l’examen = presque toujours <b>SQS</b>.</li></ul>`,
q:[
{q:"Une commande doit être envoyée simultanément aux services de facturation, d’expédition et d’analyse. Quelle approche ?",o:["Une seule file SQS","SNS avec fan-out vers plusieurs abonnés","CloudWatch Logs","Amazon MQ obligatoirement"],a:[1],e:["Une file SQS : chaque message est traité par un seul consommateur.","Exact : SNS pousse le même message à tous les abonnés.","Ce n’est pas un système de messagerie.","Possible pour du legacy, mais la réponse cloud-native est SNS."]},
{q:"Quel service orchestre un workflow en plusieurs étapes avec gestion des erreurs et des reprises ?",o:["AWS Step Functions","Amazon SQS","Amazon SNS","Amazon Kinesis"],a:[0],e:["Exact.","Une file, pas un orchestrateur.","Notifications.","Streaming de données."]},
{q:"Une entreprise migre une application qui utilise RabbitMQ sans vouloir modifier le code. Quel service ?",o:["Amazon SQS","Amazon MQ","Amazon EventBridge","AWS AppFlow"],a:[1],e:["Exigerait de réécrire le code (API différente).","Exact : RabbitMQ/ActiveMQ managés.","Autre API.","Intégration SaaS."]}]},

{n:18,t:"Les conteneurs",v:"18_les_conteneurs.mp4",d:3,
zero:`<p>Un <b>conteneur</b>, c’est comme un <b>conteneur maritime</b> : une boîte standard qui contient ton application <b>et tout ce dont elle a besoin</b> (bibliothèques, configuration). Elle fonctionne pareil sur ton portable, chez un collègue ou dans le cloud. Fini le « ça marche sur ma machine ».</p>
<p>Plus léger qu’une machine virtuelle : les conteneurs partagent le noyau de l’OS, donc démarrent en secondes.</p>`,
exam:`<table><tr><th>Service</th><th>Rôle</th></tr>
<tr><td><b>Docker</b></td><td>Technologie standard de conteneurs (image → conteneur)</td></tr>
<tr><td><b>ECR</b></td><td>Registre privé d’<b>images</b> de conteneurs</td></tr>
<tr><td><b>ECS</b></td><td>Orchestrateur AWS (simple, intégré)</td></tr>
<tr><td><b>EKS</b></td><td><b>Kubernetes</b> managé (standard open source, portable multi-cloud)</td></tr>
<tr><td><b>Fargate</b></td><td>Exécuter les conteneurs ECS/EKS <b>sans gérer de serveurs</b></td></tr>
<tr><td>App Runner</td><td>Le plus simple : appli web conteneurisée de A à Z</td></tr>
<tr><td>ECS/EKS Anywhere</td><td>Mêmes outils sur tes serveurs sur site</td></tr></table>
<table><tr><th></th><th>Machine virtuelle</th><th>Conteneur</th></tr>
<tr><td>Contient</td><td>OS complet</td><td>Appli + dépendances</td></tr>
<tr><td>Démarrage</td><td>Minutes</td><td>Secondes</td></tr>
<tr><td>Taille</td><td>Go</td><td>Mo</td></tr></table>`,
pro:`<ul><li>Deux « modes de lancement » : <b>EC2</b> (tu gères les instances du cluster, plus de contrôle, possibilité de RI/Spot) ou <b>Fargate</b> (serverless, tu paies vCPU/mémoire par tâche).</li>
<li>« L’équipe utilise déjà Kubernetes sur site et veut la même chose sur AWS » → <b>EKS</b>.</li>
<li>« Microservices, le moins d’effort opérationnel » → <b>ECS + Fargate</b> ou App Runner.</li>
<li>Les conteneurs sont parfaits pour les <b>microservices</b> : chaque service est déployé et mis à l’échelle indépendamment.</li>
<li>ECR peut scanner les images à la recherche de vulnérabilités (avec Inspector).</li></ul>`,
q:[
{q:"Où stocker les images Docker privées d’une entreprise sur AWS ?",o:["Amazon ECS","Amazon ECR","AWS Fargate","Amazon EBS"],a:[1],e:["ECS exécute les conteneurs, il ne les stocke pas.","Exact : Elastic Container Registry.","Fargate exécute.","Disque d’instance."]},
{q:"Quel avantage principal ont les conteneurs par rapport aux machines virtuelles ?",o:["Ils incluent un OS complet","Ils sont plus légers et démarrent plus vite","Ils ne nécessitent aucun code","Ils sont toujours gratuits"],a:[1],e:["C’est la VM qui inclut l’OS complet.","Exact.","Ils contiennent ton application.","Ils consomment des ressources payantes."]},
{q:"Une entreprise veut une solution de conteneurs portable vers d’autres clouds grâce à un standard open source. Quel service ?",o:["Amazon ECS","Amazon EKS","AWS Lambda","AWS Batch"],a:[1],e:["ECS est propriétaire à AWS.","Exact : Kubernetes est le standard ouvert.","Pas des conteneurs orchestrés.","Traitements par lots."]}]},

{n:19,t:"La gouvernance",v:"19_la_gouvernance.mp4",d:2,
zero:`<p>Quand une entreprise a des dizaines d’équipes et de comptes AWS, il faut des <b>règles du jeu</b> : qui paie quoi, ce qui est interdit, comment vérifier que tout respecte les normes. C’est la <b>gouvernance</b>. Comme le règlement d’une copropriété avec un syndic qui vérifie et une facture commune.</p>`,
exam:`<table><tr><th>Service</th><th>Rôle</th></tr>
<tr><td><b>AWS Organizations</b></td><td>Regrouper les comptes en OU, <b>facturation consolidée</b>, <b>SCP</b></td></tr>
<tr><td><b>SCP</b></td><td>Plafond de permissions pour un compte/OU (ex. interdire une région)</td></tr>
<tr><td><b>Control Tower</b></td><td>Landing zone multi-comptes + <i>contrôles</i> (guardrails) préventifs et détectifs, tableau de bord</td></tr>
<tr><td><b>AWS Config</b></td><td>Inventaire, historique et conformité des configurations (+ remédiation)</td></tr>
<tr><td><b>Service Catalog</b></td><td>Catalogue de produits approuvés (modèles CloudFormation) que les utilisateurs peuvent lancer</td></tr>
<tr><td>License Manager</td><td>Suivre les licences logicielles (Microsoft, Oracle)</td></tr>
<tr><td><b>Tags</b> & Resource Groups</td><td>Étiqueter (projet, coût, propriétaire) et regrouper des ressources</td></tr>
<tr><td>Tag Policies</td><td>Imposer des tags standard dans l’organisation</td></tr>
<tr><td>Service Quotas</td><td>Voir et augmenter les limites de services</td></tr>
<tr><td><b>Trusted Advisor</b></td><td>Vérifications : coûts, performance, sécurité, tolérance aux pannes, quotas, excellence opérationnelle</td></tr>
<tr><td>AWS Health Dashboard</td><td>Événements qui touchent tes ressources</td></tr>
<tr><td>Well-Architected Tool</td><td>Évaluer une charge de travail</td></tr></table>`,
pro:`<ul><li>Une SCP <b>n’accorde jamais</b> de permission : elle limite seulement. Il faut toujours un Allow IAM dans le compte.</li>
<li>Les SCP ne s’appliquent pas au compte de gestion (management account).</li>
<li>Stratégie multi-comptes : comptes séparés pour isoler sécurité, facturation, environnements (« blast radius » réduit).</li>
<li>Control Tower = automatisation au-dessus d’Organizations + IAM Identity Center + Config + CloudTrail.</li>
<li>« S’assurer que les développeurs ne lancent que des configurations approuvées » → <b>Service Catalog</b>.</li>
<li>« Répartir la facture par département » → <b>tags d’allocation des coûts</b> (activés dans la console de facturation).</li></ul>`,
q:[
{q:"Une entreprise veut empêcher tous ses comptes de créer des ressources hors des régions européennes. Quoi utiliser ?",o:["Une SCP dans AWS Organizations","AWS Trusted Advisor","Amazon Inspector","AWS Budgets"],a:[0],e:["Exact : une SCP peut refuser les actions hors de certaines régions.","Recommande, ne bloque pas.","Scan de vulnérabilités.","Alertes de coûts."]},
{q:"Quel service permet de mettre en place rapidement un environnement multi-comptes sécurisé selon les bonnes pratiques ?",o:["AWS Control Tower","AWS Config","Amazon Cognito","AWS Artifact"],a:[0],e:["Exact : landing zone + garde-fous.","Évalue la conformité, n’installe pas l’environnement multi-comptes.","Identité d’applis.","Rapports de conformité."]},
{q:"Les administrateurs veulent que les utilisateurs ne puissent lancer que des produits IT pré-approuvés. Quel service ?",o:["AWS Service Catalog","AWS Marketplace","AWS License Manager","Elastic Beanstalk"],a:[0],e:["Exact.","Achat de logiciels tiers.","Gestion des licences.","Déploiement d’applis, pas de catalogue approuvé."]}]},

{n:20,t:"Le provisionnement",v:"20_le_provisionnement.mp4",d:3,
zero:`<p>« Provisionner », c’est <b>créer et préparer</b> les ressources dont on a besoin. On peut le faire à la main dans la console (lent, sujet aux erreurs) ou <b>automatiquement</b> avec un fichier qui décrit tout (comme une recette de cuisine que la machine suit exactement à chaque fois).</p>`,
exam:`<table><tr><th>Service</th><th>Niveau d’abstraction</th></tr>
<tr><td><b>CloudFormation</b></td><td>IaC : modèles JSON/YAML → « piles » (stacks). Gratuit (on paie les ressources).</td></tr>
<tr><td><b>CDK</b></td><td>IaC en Python, TypeScript, Java…</td></tr>
<tr><td><b>Elastic Beanstalk</b></td><td>PaaS : tu donnes le code, il crée EC2, ELB, Auto Scaling, surveillance</td></tr>
<tr><td><b>Service Catalog</b></td><td>Produits approuvés à lancer en libre-service</td></tr>
<tr><td><b>Systems Manager</b></td><td>Configurer, patcher, exécuter des commandes à grande échelle</td></tr>
<tr><td>Amplify</td><td>Provisionner un backend d’appli web/mobile</td></tr>
<tr><td>Launch Templates</td><td>Modèles de lancement EC2</td></tr>
<tr><td>Terraform (HashiCorp)</td><td>Outil IaC tiers multi-cloud (hors AWS mais fréquent)</td></tr></table>`,
pro:`<ul><li>CloudFormation détecte la <b>dérive</b> (drift) : une ressource modifiée à la main par rapport au modèle.</li>
<li>Avantages IaC : reproductibilité, versionnement Git, revue de code, suppression propre (supprimer la pile supprime tout), déploiement multi-régions/comptes (StackSets).</li>
<li>Beanstalk vs CloudFormation : Beanstalk est fait pour les <b>développeurs</b> qui veulent déployer une appli web vite ; CloudFormation pour décrire <b>n’importe quelle</b> infrastructure. Beanstalk utilise CloudFormation en coulisse.</li>
<li>OpsWorks (Chef/Puppet) a été retiré en 2024 : remplacé par Systems Manager.</li>
<li>Beanstalk : stratégies de déploiement (all at once, rolling, immutable, blue/green).</li></ul>`,
q:[
{q:"Une équipe veut recréer exactement le même environnement dans 3 régions, de manière automatique et versionnée. Quel service ?",o:["AWS CloudFormation","La console de gestion","AWS Trusted Advisor","Amazon Lightsail"],a:[0],e:["Exact : IaC avec modèles (et StackSets pour plusieurs régions/comptes).","Manuel, sujet aux erreurs.","Recommandations.","Serveurs simples, pas d’IaC multi-régions."]},
{q:"Un développeur veut déployer une appli Python sans s’occuper de l’infrastructure, tout en gardant l’accès aux ressources sous-jacentes. Quel service ?",o:["AWS Elastic Beanstalk","AWS CloudFormation","Amazon EC2 seul","AWS Lambda"],a:[0],e:["Exact : PaaS qui laisse visibles les EC2 créées.","Il faudrait écrire tout le modèle.","Tout manuel.","Serverless : pas d’accès aux ressources sous-jacentes, et limites de 15 min."]},
{q:"Comment s’appelle la différence entre la configuration réelle d’une ressource et celle définie dans son modèle CloudFormation ?",o:["Dérive (drift)","Snapshot","Réplication","Élasticité"],a:[0],e:["Exact : la détection de dérive la repère.","Copie d’un volume.","Copie de données.","Ajustement automatique de capacité."]}]}
);
