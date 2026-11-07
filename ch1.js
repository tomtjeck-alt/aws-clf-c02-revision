window.CH = window.CH || [];
CH.push(
{n:1,t:"Introduction et examen",v:"01_introduction_et_examen.mp4",d:1,
zero:`<p>Imagine que tu as besoin d’ordinateurs pour faire tourner un site web. Avant, une entreprise devait <b>acheter</b> des serveurs, les installer dans une salle climatisée et payer des techniciens. <b>AWS (Amazon Web Services)</b> loue ces ordinateurs (et plus de 200 services) par Internet, à la minute, comme on paie l’électricité.</p>
<p>La certification <b>Cloud Practitioner</b> prouve que tu comprends <b>ce que fait AWS, à quoi sert chaque grand service, comment c’est sécurisé et comment c’est facturé</b>. Ce n’est pas un examen technique de programmation : c’est un examen de <b>vocabulaire et de choix</b> (« quel service pour quel besoin ? »).</p>`,
exam:`<table><tr><th>Élément</th><th>Valeur</th></tr>
<tr><td>Code</td><td>CLF-C02 (niveau « Foundational »)</td></tr>
<tr><td>Questions</td><td>65 : 50 notées + 15 non notées (expérimentales, impossibles à repérer)</td></tr>
<tr><td>Types</td><td>Choix unique (1 bonne sur 4) ou choix multiples (2+ bonnes sur 5+)</td></tr>
<tr><td>Durée</td><td>90 min (+30 min avec l’aménagement ESL pour non-anglophones)</td></tr>
<tr><td>Note</td><td>700/1000, score <b>pondéré</b> ; pas de pénalité pour une mauvaise réponse</td></tr>
<tr><td>Domaines</td><td>Concepts cloud 24 % · Sécurité 30 % · Technologies 34 % · Facturation 12 %</td></tr>
<tr><td>Validité</td><td>3 ans</td></tr></table>
<p><b>Parcours de certifications AWS</b> : Foundational (Cloud Practitioner, AI Practitioner) → Associate (Solutions Architect, Developer, SysOps, Data Engineer, ML Engineer) → Professional → Specialty.</p>`,
pro:`<ul><li><b>Lire la question à l’envers</b> : lis d’abord la dernière phrase (« Quel service… le PLUS rentable ? »), puis le scénario. Les adjectifs <i>le plus économique</i>, <i>le moins d’effort opérationnel</i>, <i>le plus sécurisé</i> départagent les réponses.</li>
<li><b>Distracteurs typiques</b> : un vrai service AWS mais du mauvais domaine (ex. Inspector au lieu de GuardDuty), ou un service qui « marche » mais demande plus de travail (EC2 au lieu de Lambda).</li>
<li><b>Gestion du temps</b> : 1 passage rapide en marquant (« flag ») les douteuses, puis 2e passage. Ne laisse jamais une question vide.</li>
<li>Comme 15 questions ne comptent pas, une question bizarre peut être expérimentale : ne panique pas.</li>
<li>Méthode de ce cours : pour chaque chapitre, lis Zéro → Examen → Pro, puis fais le quiz. Refais les quiz ratés le lendemain (répétition espacée).</li></ul>`,
q:[
{q:"Combien de questions de l’examen CLF-C02 comptent réellement dans la note ?",o:["65","50","15","40"],a:[1],e:["Il y a 65 questions au total, mais 15 ne sont pas notées.","Exact : 50 questions notées + 15 expérimentales.","15, c’est le nombre de questions NON notées.","Aucun rapport avec le format officiel."]},
{q:"Quelle stratégie est la meilleure lorsqu’on ne connaît pas la réponse ?",o:["Laisser vide pour éviter une pénalité","Éliminer les options fausses et répondre quand même","Choisir toujours la réponse la plus longue","Quitter l’examen"],a:[1],e:["Il n’y a pas de pénalité : une réponse vide vaut 0, une réponse au hasard peut valoir des points.","Exact : éliminer 2 options donne 50 % de chances.","Ce n’est pas une méthode fiable.","Évidemment non."]},
{q:"Quel domaine a le poids le plus élevé dans l’examen ?",o:["Concepts du cloud","Sécurité et conformité","Technologies et services cloud","Facturation, tarifs et support"],a:[2],e:["24 %.","30 % : deuxième.","Exact : 34 %.","12 % : le plus faible."]}]},

{n:2,t:"Concepts du cloud",v:"02_concepts_du_cloud.mp4",d:1,
zero:`<p><b>Le cloud = l’ordinateur de quelqu’un d’autre, loué à la demande, accessible par Internet.</b></p>
<p>Analogie : avoir un générateur électrique chez soi (sur site / <i>on-premises</i>) vs se brancher au réseau électrique (cloud). Avec le réseau, tu ne t’occupes pas de la centrale, tu paies ce que tu consommes et tu peux en consommer beaucoup plus d’un coup.</p>
<p>Les trois façons de « louer » : <b>IaaS</b> (on te prête la cuisine : tu cuisines tout), <b>PaaS</b> (on te livre les ingrédients prêts, tu fais juste la recette), <b>SaaS</b> (tu vas au restaurant : tu manges).</p>`,
exam:`<h4>Les 5 caractéristiques essentielles (définition NIST)</h4><ol>
<li><b>Libre-service à la demande</b> : tu crées une ressource sans parler à un humain.</li>
<li><b>Large accès réseau</b> : accessible par Internet, depuis tout appareil.</li>
<li><b>Mutualisation des ressources</b> (multi-locataire) : plusieurs clients partagent le matériel, isolés logiquement.</li>
<li><b>Élasticité rapide</b> : monter/descendre vite.</li>
<li><b>Service mesuré</b> : on paie selon la consommation.</li></ol>
<table><tr><th>Modèle</th><th>Tu gères</th><th>Le fournisseur gère</th><th>AWS</th></tr>
<tr><td>IaaS</td><td>OS, runtime, appli, données</td><td>Matériel, réseau, virtualisation</td><td>EC2, EBS, VPC</td></tr>
<tr><td>PaaS</td><td>Appli, données</td><td>+ OS, runtime</td><td>Elastic Beanstalk, RDS</td></tr>
<tr><td>SaaS</td><td>Tes données / réglages</td><td>Tout le reste</td><td>WorkMail, Amazon Chime, QuickSight</td></tr></table>
<table><tr><th>Déploiement</th><th>Définition</th></tr>
<tr><td>Cloud public</td><td>Tout chez AWS</td></tr>
<tr><td>Privé (sur site)</td><td>Ton datacenter, virtualisé (VMware, OpenStack)</td></tr>
<tr><td>Hybride</td><td>Les deux, reliés (VPN, Direct Connect, Outposts)</td></tr></table>`,
pro:`<ul><li>Sur l’examen, « <b>cloud computing</b> » = livraison <b>à la demande</b> de ressources IT via Internet avec <b>tarification à l’usage</b>. Retiens cette phrase.</li>
<li>Le cloud n’est pas forcément moins cher en absolu : il l’est quand on <b>évite le surprovisionnement</b> et qu’on utilise les bons modèles de prix.</li>
<li>Multi-locataire ≠ moins sûr : l’isolation est garantie par l’hyperviseur (AWS Nitro). Si la conformité exige du matériel non partagé → <b>Dedicated Instances/Hosts</b>.</li>
<li>Hybride typique en entreprise : AD sur site + appli sur AWS + lien Direct Connect + sauvegarde via Storage Gateway.</li></ul>`,
q:[
{q:"Dans quel modèle de service le client gère-t-il le système d’exploitation ?",o:["SaaS","PaaS","IaaS","Aucun"],a:[2],e:["En SaaS, le client n’utilise que le logiciel.","En PaaS, le fournisseur gère l’OS.","Exact : en IaaS (ex. EC2), l’OS est à toi.","Faux : en IaaS, c’est le client."]},
{q:"Une entreprise garde ses bases de données dans son datacenter et héberge son site web sur AWS, les deux étant connectés. Quel modèle de déploiement ?",o:["Cloud public","Hybride","Privé","Multi-locataire"],a:[1],e:["Une partie est sur site, donc pas 100 % cloud.","Exact : sur site + cloud reliés = hybride.","Une partie est sur AWS, donc pas uniquement privé.","Multi-locataire décrit le partage de matériel, pas un modèle de déploiement."]},
{q:"Quelle caractéristique du cloud signifie qu’on peut créer un serveur soi-même en quelques clics sans contacter le fournisseur ?",o:["Service mesuré","Libre-service à la demande","Mutualisation des ressources","Large accès réseau"],a:[1],e:["Service mesuré = payer selon l’usage.","Exact.","Mutualisation = partage du matériel entre clients.","Large accès réseau = accessible de partout via Internet."]}]},

{n:3,t:"Démarrer avec AWS",v:"03_demarrer_avec_aws.mp4",d:2,
zero:`<p>Pour commencer, tu crées un <b>compte AWS</b> avec un email et une carte bancaire. L’email du compte devient l’<b>utilisateur root</b> : le « propriétaire » qui a tous les pouvoirs, comme le titulaire d’un compte bancaire.</p>
<p>Première règle de survie : <b>protéger le root</b> (MFA = code sur ton téléphone) puis créer un autre utilisateur pour travailler au quotidien. Deuxième règle : <b>créer une alerte de budget</b> pour ne jamais recevoir de mauvaise surprise sur la facture.</p>`,
exam:`<h4>Checklist d’un nouveau compte</h4><ol>
<li>Activer la <b>MFA sur le root</b>.</li>
<li>Créer un utilisateur administrateur (IAM ou IAM Identity Center) et l’utiliser au quotidien.</li>
<li>Créer un <b>AWS Budget</b> avec alerte email.</li>
<li>Choisir sa <b>région</b> en haut à droite de la console.</li></ol>
<h4>Façons d’utiliser AWS</h4>
<table><tr><td><b>Console de gestion</b></td><td>Interface web</td></tr>
<tr><td><b>CLI</b></td><td>Ligne de commande (<code>aws s3 ls</code>), avec des <b>clés d’accès</b></td></tr>
<tr><td><b>SDK</b></td><td>Bibliothèques pour programmer (Python boto3, Java, JS…)</td></tr>
<tr><td><b>CloudShell</b></td><td>Terminal dans le navigateur, déjà authentifié, gratuit</td></tr></table>
<h4>Services globaux vs régionaux</h4>
<p>La plupart des services sont <b>régionaux</b> (EC2, RDS, Lambda…). Quelques-uns sont <b>globaux</b> : IAM, Route 53, CloudFront, Organizations, WAF (pour CloudFront). S3 a des noms de buckets globaux mais chaque bucket vit dans une région.</p>
<p><b>Free Tier</b> : offres gratuites (essais, 12 mois, toujours gratuites ; nouveaux comptes depuis 2025 : crédits).</p>`,
pro:`<ul><li><b>ARN</b> (Amazon Resource Name) identifie une ressource de façon unique : <code>arn:aws:s3:::mon-bucket</code>.</li>
<li>Le root ne peut pas être limité par une politique IAM, mais il peut l’être par une <b>SCP</b> s’il s’agit d’un compte membre d’une organisation.</li>
<li>Le root doit faire : changer le plan de support, fermer le compte, modifier email/mot de passe root, restaurer les droits d’un admin IAM bloqué.</li>
<li>En entreprise on n’utilise pas un seul compte : on utilise <b>plusieurs comptes</b> (dev, test, prod) via <b>Organizations / Control Tower</b> (chapitre 19).</li>
<li>Piège : la console affiche une région, mais un service global (IAM) affiche « Global ». Si une ressource « disparaît », vérifie la région sélectionnée !</li></ul>`,
q:[
{q:"Quelle est la PREMIÈRE action recommandée sur un nouveau compte AWS ?",o:["Créer des clés d’accès root","Activer la MFA sur l’utilisateur root","Lancer une instance EC2","Rendre un bucket S3 public"],a:[1],e:["AWS recommande justement de ne pas avoir de clés root.","Exact : protéger le compte le plus puissant d’abord.","Pas une mesure de sécurité.","Dangereux et sans rapport."]},
{q:"Quel service est GLOBAL (et non régional) ?",o:["Amazon EC2","Amazon RDS","AWS IAM","AWS Lambda"],a:[2],e:["EC2 est régional.","RDS est régional.","Exact : les utilisateurs et rôles IAM valent pour toutes les régions.","Lambda est régional."]},
{q:"Un développeur veut lancer des commandes AWS depuis son navigateur, sans rien installer. Quel outil ?",o:["AWS CLI installée localement","AWS CloudShell","AWS SDK","AWS Marketplace"],a:[1],e:["Il faudrait l’installer et configurer des clés.","Exact : CloudShell = terminal web déjà authentifié.","Le SDK sert à programmer, il faut l’installer.","Le Marketplace vend des logiciels tiers."]}]},

{n:4,t:"Transformation numérique",v:"04_transformation_numerique.mp4",d:1,
zero:`<p>La <b>transformation numérique</b>, c’est quand une entreprise change sa façon de travailler grâce à la technologie : un taxi devient une appli de VTC, une banque devient une appli mobile.</p>
<p>Le cloud est le moteur de cette transformation : au lieu d’attendre 3 mois l’achat d’un serveur, une équipe peut tester une idée <b>aujourd’hui</b> pour quelques dollars, et l’abandonner demain si elle ne marche pas.</p>`,
exam:`<h4>Évolution de l’informatique (du plus lourd au plus léger)</h4>
<table><tr><th>Étape</th><th>Tu gères</th><th>Exemple AWS</th></tr>
<tr><td>Serveur physique dédié</td><td>Tout, y compris le matériel</td><td>EC2 Dedicated Host / Bare Metal</td></tr>
<tr><td>Machines virtuelles</td><td>OS + appli</td><td>EC2</td></tr>
<tr><td>Conteneurs</td><td>Appli + dépendances</td><td>ECS, EKS, Fargate</td></tr>
<tr><td>Fonctions (serverless)</td><td>Seulement le code</td><td>Lambda</td></tr></table>
<p>Plus on monte, plus on gagne en <b>agilité</b> et moins on a de travail d’exploitation.</p>
<h4>Pourquoi les entreprises migrent</h4><ul>
<li>Innover plus vite (time-to-market), expérimenter à faible coût.</li>
<li>Passer du CapEx à l’OpEx.</li>
<li>Se concentrer sur ce qui différencie l’entreprise (« undifferentiated heavy lifting » laissé à AWS).</li></ul>`,
pro:`<ul><li><b>« Undifferentiated heavy lifting »</b> : expression AWS pour les tâches lourdes qui n’apportent aucune valeur au client (racker des serveurs, patcher des BD). Les services managés les éliminent. Si une question parle de « se concentrer sur le cœur de métier » → service managé.</li>
<li>La transformation est autant <b>culturelle</b> que technique : c’est le rôle de la perspective <b>People</b> du CAF (chapitre 25-26).</li>
<li>Les phases du CAF : <b>Envision</b> (vision) → <b>Align</b> (alignement des parties prenantes) → <b>Launch</b> (pilotes en production) → <b>Scale</b> (passage à l’échelle).</li>
<li>Pour l’examen, l’idée-clé : le cloud réduit le <b>coût de l’échec</b> → on peut expérimenter davantage.</li></ul>`,
q:[
{q:"Quel modèle de calcul exige le MOINS de gestion par le client ?",o:["Serveurs physiques","Machines virtuelles EC2","Conteneurs sur EC2","Fonctions Lambda"],a:[3],e:["Il faut gérer matériel, OS, appli.","Il faut gérer l’OS et l’appli.","Il faut gérer les instances et les conteneurs.","Exact : avec Lambda, tu fournis seulement le code."]},
{q:"Pourquoi le cloud favorise-t-il l’innovation ?",o:["Il oblige à signer des contrats longs","Il réduit le coût et le délai pour tester une idée","Il supprime la nécessité de sécurité","Il impose un seul langage de programmation"],a:[1],e:["C’est le contraire : pas d’engagement obligatoire.","Exact : expérimenter vite et pour peu cher.","La sécurité reste partagée (chapitre 9).","Faux : AWS supporte de nombreux langages."]},
{q:"Quelle phase du CAF consiste à livrer des projets pilotes en production pour démontrer la valeur ?",o:["Envision","Align","Launch","Scale"],a:[2],e:["Envision définit la vision et les opportunités.","Align identifie les lacunes et aligne les équipes.","Exact : Launch = pilotes en production.","Scale = étendre à toute l’entreprise."]}]},

{n:5,t:"Les avantages du cloud",v:"05_les_avantages_du_cloud.mp4",d:1,
zero:`<p>Pourquoi tout le monde passe au cloud ? Parce que c’est comme passer de <b>l’achat d’une voiture</b> à <b>la location à la minute</b> : pas de gros chèque au départ, tu prends un camion quand tu déménages et une petite voiture le reste du temps, et tu ne t’occupes pas de l’entretien.</p>`,
exam:`<h4>Les 6 avantages officiels AWS (par cœur !)</h4><ol>
<li><b>Remplacer les dépenses fixes (CapEx) par des dépenses variables (OpEx)</b></li>
<li><b>Profiter d’économies d’échelle massives</b></li>
<li><b>Ne plus deviner la capacité</b></li>
<li><b>Gagner en rapidité et en agilité</b></li>
<li><b>Ne plus investir dans l’exploitation de datacenters</b></li>
<li><b>Se déployer à l’international en quelques minutes</b></li></ol>
<h4>Vocabulaire associé</h4>
<table><tr><td><b>Scalabilité verticale</b> (scale up)</td><td>Machine plus puissante. Limite physique, souvent un redémarrage.</td></tr>
<tr><td><b>Scalabilité horizontale</b> (scale out)</td><td>Plus de machines. Préférée dans le cloud.</td></tr>
<tr><td><b>Élasticité</b></td><td>Scaler automatiquement dans les deux sens selon la demande.</td></tr>
<tr><td><b>Haute disponibilité</b></td><td>Réduire les temps d’arrêt (plusieurs AZ).</td></tr>
<tr><td><b>Tolérance aux pannes</b></td><td>Aucune interruption même en cas de panne d’un composant.</td></tr>
<tr><td><b>Durabilité</b></td><td>Les données ne sont pas perdues (S3 : 11 neuf).</td></tr></table>`,
pro:`<ul><li>Piège : <b>économies d’échelle</b> ≠ <b>payer à l’usage</b>. Économies d’échelle = AWS achète des millions de serveurs → prix unitaires bas pour tous les clients (et AWS baisse régulièrement ses prix).</li>
<li>« L’entreprise ne sait pas combien d’utilisateurs elle aura » → <b>ne plus deviner la capacité</b>.</li>
<li>« Lancer en Asie en une journée » → <b>déploiement mondial en minutes</b>.</li>
<li>« Les développeurs obtiennent des ressources en minutes au lieu de semaines » → <b>vitesse et agilité</b>.</li>
<li>Élasticité vs scalabilité : la scalabilité est la <i>capacité</i> à grandir ; l’élasticité est l’<i>ajustement automatique</i> à la hausse ET à la baisse.</li></ul>`,
q:[
{q:"Une entreprise profite de prix plus bas parce qu’AWS agrège l’usage de centaines de milliers de clients. Quel avantage ?",o:["Ne plus deviner la capacité","Économies d’échelle massives","Agilité","Déploiement mondial"],a:[1],e:["Concerne le dimensionnement, pas les prix.","Exact.","Concerne la rapidité.","Concerne la portée géographique."]},
{q:"Ajouter plus d’instances EC2 derrière un équilibreur de charge, c’est :",o:["Scalabilité verticale","Scalabilité horizontale","Durabilité","Tolérance aux pannes uniquement"],a:[1],e:["Vertical = une machine plus grosse.","Exact : plus de machines = horizontal.","La durabilité concerne la conservation des données.","Ça peut aider, mais ce qui est décrit est le scale out."]},
{q:"Quels sont DEUX avantages officiels du cloud AWS ? (Choisissez DEUX.)",o:["Ne plus deviner la capacité","Payer à l’avance pour tout le matériel","Se déployer à l’international en minutes","Gérer soi-même la sécurité physique","Signer obligatoirement des contrats de 5 ans"],a:[0,2],e:["Exact.","C’est le modèle sur site que le cloud remplace.","Exact.","C’est la responsabilité d’AWS.","Aucun engagement n’est obligatoire."]}]},

{n:6,t:"Infrastructure mondiale",v:"06_infrastructure_mondiale.mp4",d:3,
zero:`<p>AWS possède des datacenters dans le monde entier. Ils sont organisés en <b>régions</b> (ex. Canada Centre – Montréal, Europe – Paris). Chaque région contient plusieurs <b>zones de disponibilité (AZ)</b> : des groupes de datacenters séparés de plusieurs kilomètres, pour qu’un incendie ou une panne électrique n’en touche qu’un.</p>
<p>En plus, AWS a des centaines de petits sites proches des utilisateurs, les <b>edge locations</b>, qui gardent des copies du contenu (vidéos, images) pour qu’il arrive plus vite.</p>`,
exam:`<table><tr><th>Composant</th><th>Définition</th><th>Utilisé par</th></tr>
<tr><td><b>Région</b></td><td>Zone géographique isolée, ≥ 3 AZ (en général). Code : <code>ca-central-1</code></td><td>Presque tous les services</td></tr>
<tr><td><b>AZ</b></td><td>1+ datacenters avec alimentation, refroidissement, réseau redondants. Code : <code>ca-central-1a</code></td><td>EC2, RDS Multi-AZ, sous-réseaux</td></tr>
<tr><td><b>Edge location / PoP</b></td><td>Site de cache et de réseau proche des utilisateurs</td><td>CloudFront, Route 53, Global Accelerator, Shield, WAF</td></tr>
<tr><td><b>Local Zone</b></td><td>Mini-extension d’une région près d’une ville</td><td>Jeux, médias, latence < 10 ms</td></tr>
<tr><td><b>Wavelength Zone</b></td><td>Infrastructure dans le réseau 5G d’un opérateur</td><td>Applis mobiles ultra-faible latence</td></tr>
<tr><td><b>Outposts</b></td><td>Matériel AWS dans ton datacenter</td><td>Hybride, latence locale, résidence des données</td></tr></table>
<h4>4 critères pour choisir une région</h4><ol><li><b>Conformité</b> (lois sur les données, ex. données qui doivent rester au Canada)</li><li><b>Latence</b> (proximité des utilisateurs)</li><li><b>Services disponibles</b> (tous ne sont pas partout)</li><li><b>Prix</b> (varient selon la région)</li></ol>`,
pro:`<ul><li><b>Les données ne quittent pas une région</b> sans action explicite de ta part (ex. réplication S3 inter-régions). C’est un argument de conformité.</li>
<li>Haute disponibilité = <b>multi-AZ</b>. Reprise après sinistre (catastrophe régionale) = <b>multi-région</b>.</li>
<li><b>AWS GovCloud (US)</b> : régions isolées pour les agences gouvernementales américaines. <b>Régions Chine</b> : exploitées par des partenaires locaux, compte séparé.</li>
<li>Le transfert de données entre AZ et entre régions est <b>payant</b> ; à l’intérieur d’une même AZ (IP privées), généralement gratuit.</li>
<li>Les edge locations sont <b>beaucoup plus nombreuses</b> que les régions (centaines vs ~35+).</li>
<li>Les noms d’AZ (<code>a</code>, <code>b</code>…) sont mélangés par compte : ta « 1a » n’est pas forcément celle d’un autre compte (on utilise les <i>AZ ID</i> pour comparer).</li></ul>`,
q:[
{q:"Qu’est-ce qu’une zone de disponibilité ?",o:["Un pays où AWS est présent","Un ou plusieurs datacenters isolés au sein d’une région","Un site de cache CloudFront","Un compte AWS secondaire"],a:[1],e:["Une région peut couvrir une zone géographique ; le pays n’est pas l’unité.","Exact.","C’est une edge location.","Sans rapport."]},
{q:"Une loi exige que les données de clients canadiens restent au Canada. Quel critère de choix de région est en jeu ?",o:["Prix","Latence","Conformité / résidence des données","Nombre d’edge locations"],a:[2],e:["Pas le facteur principal ici.","Pas mentionné.","Exact.","Les edge locations ne déterminent pas où sont stockées les données principales."]},
{q:"Une entreprise veut exécuter des services AWS avec une latence ultra-faible pour des appareils mobiles 5G. Quel service ?",o:["AWS Outposts","AWS Wavelength","AWS Local Zones","Amazon CloudFront"],a:[1],e:["Outposts = dans TON datacenter.","Exact : infrastructure dans les réseaux 5G des opérateurs.","Proche des villes, mais pas spécifiquement dans le réseau 5G.","CDN, pas d’exécution de calcul dans le réseau 5G."]}]},

{n:7,t:"Architecture cloud",v:"07_architecture_cloud.mp4",d:1,
zero:`<p>Une bonne architecture cloud répond à une question : <b>« Que se passe-t-il si quelque chose tombe en panne ? »</b>. Chez AWS on dit : <i>« Tout tombe en panne, tout le temps »</i> (Werner Vogels, CTO d’Amazon). On conçoit donc des systèmes qui <b>survivent</b> aux pannes : plusieurs copies, plusieurs endroits, et des machines qui se remplacent toutes seules.</p>`,
exam:`<table><tr><th>Concept</th><th>Solution AWS typique</th></tr>
<tr><td><b>Haute disponibilité</b> : rester accessible</td><td>Plusieurs AZ + Elastic Load Balancer</td></tr>
<tr><td><b>Scalabilité / élasticité</b></td><td>EC2 Auto Scaling, services serverless</td></tr>
<tr><td><b>Tolérance aux pannes</b> : aucune interruption</td><td>Redondance active (RDS Multi-AZ, plusieurs instances)</td></tr>
<tr><td><b>Reprise après sinistre (DR)</b></td><td>Sauvegardes et réplication dans une autre région</td></tr></table>
<h4>RPO et RTO</h4><ul>
<li><b>RPO</b> (Recovery Point Objective) : combien de <b>données</b> peut-on perdre ? (ex. 1 h de données)</li>
<li><b>RTO</b> (Recovery Time Objective) : combien de <b>temps</b> pour redémarrer ? (ex. 4 h d’arrêt)</li></ul>
<h4>4 stratégies de DR (du moins cher au plus cher)</h4>
<table><tr><th>Stratégie</th><th>Principe</th><th>RTO/RPO</th></tr>
<tr><td>Backup & Restore</td><td>Sauvegardes dans une autre région, on reconstruit après</td><td>Heures</td></tr>
<tr><td>Pilot Light (veilleuse)</td><td>Données répliquées + cœur minimal éteint, on allume au besoin</td><td>Dizaines de minutes</td></tr>
<tr><td>Warm Standby</td><td>Copie réduite mais fonctionnelle qui tourne</td><td>Minutes</td></tr>
<tr><td>Multi-site actif/actif</td><td>Deux environnements complets en production</td><td>Quasi nul</td></tr></table>`,
pro:`<ul><li>Pour se souvenir : <b>RP</b>O = <b>P</b>oint (données perdues) ; <b>RT</b>O = <b>T</b>emps.</li>
<li><b>Découplage</b> : séparer les composants (SQS entre le web et le traitement) pour qu’une panne ne se propage pas.</li>
<li>Remplacer des serveurs « animaux de compagnie » (pets, réparés à la main) par du « bétail » (cattle, remplacés automatiquement) : Auto Scaling + AMI + IaC.</li>
<li>Éviter tout <b>point unique de défaillance</b> (SPOF) : une seule instance, une seule AZ, une seule BD sans réplique.</li>
<li>Route 53 avec <b>health checks</b> et routage de <b>basculement (failover)</b> redirige vers la région de secours.</li>
<li>AWS Elastic Disaster Recovery (DRS) : réplication continue de serveurs pour une reprise rapide.</li></ul>`,
q:[
{q:"Une entreprise accepte de perdre au maximum 15 minutes de données. Quel indicateur décrit cette exigence ?",o:["RTO","RPO","SLA","TCO"],a:[1],e:["RTO = durée d’interruption acceptable, pas la quantité de données perdues.","Exact : RPO = point de récupération (perte de données).","SLA = engagement de niveau de service du fournisseur.","TCO = coût total de possession."]},
{q:"Quelle stratégie de reprise après sinistre est la MOINS chère ?",o:["Multi-site actif/actif","Warm Standby","Pilot Light","Backup & Restore"],a:[3],e:["La plus chère : tout tourne en double.","Une copie réduite tourne en permanence.","Le cœur des données est répliqué : moyen.","Exact : on ne paie que le stockage des sauvegardes, mais la récupération est lente."]},
{q:"Comment éliminer le point unique de défaillance d’une application web sur une seule instance EC2 ?",o:["Prendre une instance plus grosse","Utiliser plusieurs instances dans plusieurs AZ derrière un Load Balancer","Activer CloudTrail","Passer en Reserved Instance"],a:[1],e:["Toujours une seule instance : SPOF.","Exact.","CloudTrail journalise, il ne rend pas disponible.","Modèle de prix, sans effet sur la disponibilité."]}]},

{n:8,t:"Outils de gestion et de développement",v:"08_outils_de_gestion_et_de_developpement.mp4",d:3,
zero:`<p>Pour parler à AWS, il existe plusieurs « télécommandes » : le <b>site web (console)</b>, la <b>ligne de commande (CLI)</b>, et du <b>code (SDK)</b>. Et pour construire ou livrer des applications automatiquement, AWS propose des outils de développeur : stocker le code, le compiler, le tester et le déployer sans intervention humaine.</p>`,
exam:`<table><tr><th>Outil</th><th>Rôle</th></tr>
<tr><td>Console de gestion</td><td>Interface web graphique</td></tr>
<tr><td>AWS CLI</td><td>Commandes en terminal ; scripts</td></tr>
<tr><td>AWS SDK</td><td>Utiliser AWS dans ton code (Python, Java, .NET, JS, Go…)</td></tr>
<tr><td>CloudShell</td><td>Terminal dans le navigateur</td></tr>
<tr><td><b>CloudFormation</b></td><td>Infrastructure as Code en JSON/YAML</td></tr>
<tr><td><b>AWS CDK</b></td><td>IaC en vrai langage de programmation (génère du CloudFormation)</td></tr>
<tr><td>CodeCommit</td><td>Dépôt Git privé (fermé aux nouveaux clients depuis 2024 ; on utilise GitHub/GitLab)</td></tr>
<tr><td><b>CodeBuild</b></td><td>Compiler et tester le code</td></tr>
<tr><td><b>CodeDeploy</b></td><td>Déployer automatiquement sur EC2, Lambda, ECS, sur site</td></tr>
<tr><td><b>CodePipeline</b></td><td>Orchestrer le pipeline CI/CD complet</td></tr>
<tr><td>CodeArtifact</td><td>Dépôt de paquets (npm, Maven, pip)</td></tr>
<tr><td><b>X-Ray</b></td><td>Tracer et déboguer les requêtes dans une appli distribuée</td></tr>
<tr><td>Amplify</td><td>Créer et héberger des applis web/mobiles full-stack</td></tr>
<tr><td>Amazon Q Developer</td><td>Assistant IA pour coder (ex-CodeWhisperer)</td></tr>
<tr><td>AWS Toolkits</td><td>Extensions pour VS Code, JetBrains</td></tr></table>`,
pro:`<ul><li><b>CI/CD</b> = Intégration continue (compiler et tester à chaque commit → CodeBuild) + Livraison/Déploiement continu (→ CodeDeploy), le tout orchestré par CodePipeline.</li>
<li>Avantage d’IaC : <b>reproductible</b>, versionné, moins d’erreurs humaines, environnements identiques dev/prod. Pilier Excellence opérationnelle.</li>
<li>« Trouver quel microservice ralentit les requêtes » → <b>X-Ray</b> (pas CloudWatch, qui donne des métriques globales).</li>
<li>Pour la CLI/SDK il faut des <b>clés d’accès</b> (Access Key ID + Secret) — ou mieux, des identifiants temporaires via un rôle ou IAM Identity Center.</li>
<li>Cloud9 (IDE web) n’est plus offert aux nouveaux clients : si tu le vois, c’est un ancien IDE en ligne.</li></ul>`,
q:[
{q:"Quel service orchestre un pipeline complet de CI/CD (source → build → déploiement) ?",o:["CodeBuild","CodeDeploy","CodePipeline","CodeArtifact"],a:[2],e:["CodeBuild compile/teste seulement.","CodeDeploy déploie seulement.","Exact : CodePipeline enchaîne les étapes.","CodeArtifact stocke des paquets."]},
{q:"Un développeur veut définir son infrastructure en TypeScript plutôt qu’en YAML. Quel outil ?",o:["AWS CDK","AWS CLI","Elastic Beanstalk","Systems Manager"],a:[0],e:["Exact : le CDK utilise des langages de programmation et génère du CloudFormation.","La CLI exécute des commandes, elle ne décrit pas une infra déclarative.","Beanstalk déploie une appli, ce n’est pas un outil IaC multilangage.","Systems Manager gère des instances."]},
{q:"Quel service aide à identifier les goulots d’étranglement de performance entre les microservices d’une application ?",o:["AWS X-Ray","AWS CloudTrail","AWS Config","Amazon Inspector"],a:[0],e:["Exact : traçage distribué des requêtes.","CloudTrail journalise les appels API d’administration.","Config suit la configuration.","Inspector cherche des vulnérabilités."]}]},

{n:9,t:"Modèle de responsabilité partagée",v:"09_modele_de_responsabilite_partagee.mp4",d:2,
zero:`<p>Analogie de l’<b>appartement en location</b> : le propriétaire (AWS) est responsable de l’immeuble — fondations, toiture, serrure de l’entrée principale. Toi (le client), tu es responsable de ce que tu fais <b>dans</b> ton appartement : fermer ta porte à clé, ne pas donner ta clé à n’importe qui, protéger tes objets de valeur.</p>
<p>AWS = sécurité <b>DU</b> cloud. Toi = sécurité <b>DANS</b> le cloud.</p>`,
exam:`<table><tr><th>AWS est responsable de…</th><th>Le client est responsable de…</th></tr>
<tr><td>• Datacenters, sécurité physique, gardes<br>• Matériel (serveurs, disques, réseau)<br>• Hyperviseur / virtualisation<br>• Infrastructure mondiale (régions, AZ, edge)<br>• Logiciel des services managés (moteur RDS, OS de Lambda)</td><td>• <b>Ses données</b> et leur classification<br>• <b>IAM</b> : utilisateurs, mots de passe, MFA, permissions<br>• <b>OS invité</b> des EC2 (mises à jour, antivirus)<br>• Applications installées<br>• Configuration des <b>Security Groups</b> / pare-feu<br>• <b>Chiffrement</b> (choisir de l’activer, côté client et serveur)<br>• Protection du trafic réseau</td></tr></table>
<h4>Ça dépend du service</h4>
<table><tr><th>Service</th><th>Type</th><th>Le client gère encore</th></tr>
<tr><td>EC2</td><td>Infrastructure</td><td>OS, correctifs, appli, pare-feu, données</td></tr>
<tr><td>RDS</td><td>Conteneur/managé</td><td>Comptes de BD, accès réseau, données, options de chiffrement</td></tr>
<tr><td>S3, DynamoDB, Lambda</td><td>Abstrait</td><td>Données, permissions (politiques de bucket), code</td></tr></table>
<h4>Contrôles</h4><ul><li><b>Hérités</b> (100 % AWS) : physiques et environnementaux.</li>
<li><b>Partagés</b> : gestion des correctifs, gestion de la configuration, sensibilisation et formation.</li>
<li><b>Spécifiques au client</b> : protection des communications, zones de sécurité, routage des données.</li></ul>`,
pro:`<ul><li>Plus le service est <b>managé</b>, plus AWS en prend. Plus c’est <b>IaaS</b>, plus le client en prend.</li>
<li>Piège : « Qui patche l’OS d’une instance EC2 ? » → client. « Qui patche l’OS sous RDS ? » → AWS. « Qui patche l’hôte physique d’EC2 ? » → AWS.</li>
<li>Piège : « Qui est responsable du chiffrement des données dans S3 ? » → le <b>client</b> décide/configure (même si S3 chiffre par défaut depuis 2023 avec SSE-S3).</li>
<li>Piège : la mise au rebut sécurisée des disques → AWS. La suppression de tes données → toi.</li>
<li>Responsabilité de la <b>disponibilité</b> : AWS garantit l’infrastructure, mais c’est au client de déployer en multi-AZ s’il veut résister à une panne d’AZ.</li></ul>`,
q:[
{q:"Qui est responsable des correctifs de l’OS invité d’une instance EC2 ?",o:["AWS","Le client","Partagé à parts égales","Le fournisseur de l’AMI"],a:[1],e:["AWS gère l’hôte et l’hyperviseur, pas l’OS invité.","Exact.","La gestion des correctifs est un contrôle partagé, mais pour l’OS invité c’est le client.","L’AMI n’est qu’un modèle de départ."]},
{q:"Laquelle est une responsabilité d’AWS ?",o:["Configurer les Security Groups","Gérer les utilisateurs IAM","Sécurité physique des datacenters","Chiffrer les données client"],a:[2],e:["Client.","Client.","Exact.","Le client choisit et configure le chiffrement."]},
{q:"Pour AWS Lambda, le client est responsable de… ",o:["L’OS sous-jacent","Le code de la fonction et ses permissions IAM","Le matériel","Les correctifs du runtime géré"],a:[1],e:["Géré par AWS.","Exact : ton code, tes données, tes permissions.","Géré par AWS.","AWS met à jour les runtimes gérés."]}]},

{n:10,t:"Le calcul (compute)",v:"10_le_calcul_compute.mp4",d:3,
zero:`<p>Le « calcul », c’est la puissance de l’ordinateur qui exécute ton programme. AWS propose plusieurs formats, du plus « je contrôle tout » au plus « je ne veux rien gérer » :</p>
<p>🖥️ <b>EC2</b> = un ordinateur virtuel complet loué · 🏠 <b>Lightsail</b> = un forfait simple tout compris · 📦 <b>Conteneurs</b> = des boîtes standard contenant ton appli · ⚡ <b>Lambda</b> = tu envoies juste du code, qui s’exécute quand un événement arrive.</p>`,
exam:`<table><tr><th>Service</th><th>Quand le choisir</th></tr>
<tr><td><b>EC2</b></td><td>Contrôle total de l’OS, applis classiques, logiciels spéciaux</td></tr>
<tr><td><b>EC2 Auto Scaling</b></td><td>Ajuster automatiquement le nombre d’instances</td></tr>
<tr><td><b>Elastic Load Balancing</b></td><td>Répartir le trafic entre instances/AZ</td></tr>
<tr><td><b>Lightsail</b></td><td>Débutant, petit site, prix mensuel fixe prévisible</td></tr>
<tr><td><b>Lambda</b></td><td>Code événementiel, courts traitements (≤ 15 min), pas de serveur, facturation à la ms</td></tr>
<tr><td><b>ECS</b></td><td>Orchestrateur de conteneurs d’AWS</td></tr>
<tr><td><b>EKS</b></td><td>Kubernetes managé</td></tr>
<tr><td><b>Fargate</b></td><td>Moteur serverless pour conteneurs ECS/EKS</td></tr>
<tr><td><b>App Runner</b></td><td>Déployer une appli web conteneurisée en quelques clics</td></tr>
<tr><td><b>Elastic Beanstalk</b></td><td>PaaS : déposer son code</td></tr>
<tr><td><b>AWS Batch</b></td><td>Traitements par lots massifs</td></tr>
<tr><td>Outposts</td><td>Calcul AWS sur site</td></tr></table>`,
pro:`<ul><li>Arbre de décision : besoin de contrôler l’OS ? → EC2. Conteneurs ? → ECS/EKS (+ Fargate si pas de serveurs). Événementiel court ? → Lambda. Simple et prix fixe ? → Lightsail. Juste du code web sans config ? → Beanstalk / App Runner.</li>
<li>Lambda : max <b>15 minutes</b>, jusqu’à 10 Go de mémoire, déclencheurs (S3, API Gateway, DynamoDB, EventBridge, SQS). Pour un traitement de 2 h → pas Lambda (Batch, Fargate, EC2).</li>
<li>« Démarrage à froid » (cold start) : léger délai au premier appel d’une Lambda.</li>
<li>Load balancers : <b>ALB</b> (HTTP/HTTPS, routage par chemin/hôte), <b>NLB</b> (TCP/UDP, millions de requêtes/s, IP statique), <b>GWLB</b> (appliances de sécurité tierces).</li>
<li>Auto Scaling : capacité <b>minimale, souhaitée, maximale</b> ; politiques de suivi de cible (ex. CPU à 50 %), planifiées, prédictives.</li></ul>`,
q:[
{q:"Une tâche de traitement vidéo dure 3 heures. Quel service ne convient PAS ?",o:["Amazon EC2","AWS Batch","AWS Lambda","AWS Fargate"],a:[2],e:["EC2 peut tourner aussi longtemps que nécessaire.","Batch est fait pour ça.","Exact : Lambda est limité à 15 minutes.","Fargate n’a pas cette limite de 15 min."]},
{q:"Quel service répartit le trafic HTTP entrant entre plusieurs instances EC2 ?",o:["Auto Scaling","Application Load Balancer","Route 53","CloudFront"],a:[1],e:["Auto Scaling ajuste le nombre d’instances, il ne distribue pas le trafic.","Exact.","Route 53 est un DNS (il peut répartir entre régions, mais l’outil de répartition entre instances est l’ELB).","CloudFront est un CDN."]},
{q:"Une équipe veut exécuter des conteneurs Kubernetes sans gérer de nœuds EC2. Quelle combinaison ?",o:["ECS + EC2","EKS + Fargate","Lambda + ECR","Lightsail + ECS"],a:[1],e:["Il faudrait gérer les instances, et ECS n’est pas Kubernetes.","Exact : EKS = Kubernetes, Fargate = sans serveurs.","Lambda n’est pas Kubernetes.","Combinaison sans rapport."]}]}
);
