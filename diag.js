/* ===== Moteur de schémas SVG =====
 b: boîte [x,y,w,h,'Ligne1|ligne2',flags]   flags: a=orange g=vert r=rouge u=bleu d=conteneur pointillé x=bord pointillé n=texte normal
 a: flèche [x1,y1,x2,y2,'étiquette',flags]  flags: 2=double x=pointillé + couleurs
 t: texte  [x,y,'texte',flags]               flags: l=gauche R=droite b=gras s=petit m=gris + couleurs
 p: ligne  [points,flags]                    flags: k=épais x=pointillé z=forme fermée + couleurs
 c: cercle [cx,cy,r,'texte',flags]
*/
let DGi = 0;
function svgDiag(sp) {
  const id = 'dg' + (++DGi);
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const C = { a: 'var(--acc)', g: 'var(--ok)', r: 'var(--ko)', u: 'var(--blue)' };
  const col = f => f.includes('a') ? C.a : f.includes('g') ? C.g : f.includes('r') ? C.r : f.includes('u') ? C.u : null;
  const mk = k => `<marker id="${id}${k}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0L10,5L0,10z" style="fill:${k === 'k' ? 'currentColor' : C[k]}"/></marker>`;
  const halo = 'paint-order:stroke;stroke:var(--card);stroke-width:4px;stroke-linejoin:round';
  let o = `<figure class="dg"><svg viewBox="0 0 ${sp.w} ${sp.h}" role="img" aria-label="${esc(sp.cap)}" style="max-width:${sp.w}px"><defs>${['k', 'a', 'g', 'r', 'u'].map(mk).join('')}</defs>`;
  for (const e of sp.el) {
    const k = e[0];
    if (k === 'b') {
      const [, x, y, w, h, label = '', f = ''] = e;
      const c = col(f), cont = f.includes('d');
      const stroke = c || 'currentColor', so = c ? 1 : .55;
      const fill = c || 'currentColor', fo = cont ? .05 : (c ? .15 : 0);
      o += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" style="fill:${fill};fill-opacity:${fo};stroke:${stroke};stroke-opacity:${so};stroke-width:1.4${cont || f.includes('x') ? ';stroke-dasharray:6 4' : ''}"/>`;
      if (cont) { o += `<text x="${x + 10}" y="${y + 17}" style="font-size:12px;font-weight:700;fill:${c || 'currentColor'}">${esc(label)}</text>`; continue; }
      const L = String(label).split('|'); let ty = y + h / 2 - (L.length - 1) * 7 + 4.5;
      L.forEach((l, i) => { o += `<text x="${x + w / 2}" y="${ty + i * 14}" text-anchor="middle" style="font-size:${i ? 11 : 12.5}px;font-weight:${i || f.includes('n') ? 400 : 700};fill:currentColor${i ? ';fill-opacity:.8' : ''}">${esc(l)}</text>`; });
    } else if (k === 'a') {
      const [, x1, y1, x2, y2, label = '', f = ''] = e;
      const c = col(f); const m = f.includes('a') ? 'a' : f.includes('g') ? 'g' : f.includes('r') ? 'r' : f.includes('u') ? 'u' : 'k';
      o += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" marker-end="url(#${id}${m})" ${f.includes('2') ? `marker-start="url(#${id}${m})"` : ''} style="stroke:${c || 'currentColor'};stroke-width:1.5${f.includes('x') ? ';stroke-dasharray:5 4' : ''}"/>`;
      if (label) o += `<text x="${(x1 + x2) / 2}" y="${(y1 + y2) / 2 - 6}" text-anchor="middle" style="font-size:11px;fill:${c || 'currentColor'};${halo}">${esc(label)}</text>`;
    } else if (k === 't') {
      const [, x, y, txt, f = ''] = e;
      const anc = f.includes('l') ? 'start' : f.includes('R') ? 'end' : 'middle';
      const c = col(f) || (f.includes('m') ? 'var(--mute)' : 'currentColor');
      o += `<text x="${x}" y="${y}" text-anchor="${anc}" style="font-size:${f.includes('s') ? 11 : 12.5}px;font-weight:${f.includes('b') ? 700 : 400};fill:${c}">${esc(txt)}</text>`;
    } else if (k === 'p') {
      const [, pts, f = ''] = e; const c = col(f) || 'currentColor';
      o += `<${f.includes('z') ? 'polygon' : 'polyline'} points="${pts}" style="fill:${f.includes('z') ? c : 'none'};fill-opacity:.12;stroke:${c};stroke-width:${f.includes('k') ? 2.6 : 1.6}${f.includes('x') ? ';stroke-dasharray:6 4' : ''};stroke-linejoin:round"/>`;
    } else if (k === 'c') {
      const [, cx, cy, r, label = '', f = ''] = e; const c = col(f) || 'currentColor';
      o += `<circle cx="${cx}" cy="${cy}" r="${r}" style="fill:${c};fill-opacity:.15;stroke:${c};stroke-width:1.4"/><text x="${cx}" y="${cy + 4}" text-anchor="middle" style="font-size:11px;font-weight:700;fill:currentColor">${esc(label)}</text>`;
    }
  }
  return o + `</svg><figcaption>${esc(sp.cap)}</figcaption></figure>`;
}

/* ===== Schémas par chapitre ===== */
const DG = {};

DG[1] = [{ w: 760, h: 235, cap: "La CLF-C02 est la porte d’entrée du parcours AWS. Les domaines Technologies (34 %) et Sécurité (30 %) font presque deux tiers de la note.", el: [
  ['t', 20, 22, 'Parcours de certification AWS', 'lb'],
  ['b', 20, 35, 200, 52, 'Foundational|Cloud Practitioner ← toi', 'a'],
  ['b', 280, 35, 200, 52, 'Associate|Architect, Developer, SysOps…'],
  ['b', 540, 35, 200, 52, 'Professional|Architect Pro, DevOps Pro'],
  ['a', 220, 61, 278, 61], ['a', 480, 61, 538, 61],
  ['t', 20, 122, 'Poids des domaines à l’examen', 'lb'],
  ['b', 20, 135, 168, 50, 'Concepts cloud|24 %'],
  ['b', 188, 135, 210, 50, 'Sécurité|30 %', 'u'],
  ['b', 398, 135, 238, 50, 'Technologies|34 %', 'a'],
  ['b', 636, 135, 104, 50, 'Facturation|12 %'],
  ['t', 380, 220, '65 questions (50 notées + 15 non notées) · 90 min · réussite à 700 / 1000', 'm']]}];

DG[2] = [(() => {
  const L = ['Données', 'Application', 'Runtime', 'Système d’exploitation', 'Virtualisation', 'Serveurs', 'Réseau & stockage'];
  const Cc = [['Sur site', 7], ['IaaS (EC2)', 4], ['PaaS (Beanstalk)', 2], ['SaaS (WorkMail)', 0]];
  const el = [];
  Cc.forEach(([n, k], i) => { const x = 20 + i * 185; el.push(['t', x + 82, 26, n, 'b']); L.forEach((l, j) => el.push(['b', x, 38 + j * 32, 165, 28, l, (j < k ? 'a' : '') + 'n'])); });
  el.push(['b', 20, 276, 22, 14, '', 'a'], ['t', 50, 288, '= c’est toi qui gères', 'l'], ['b', 230, 276, 22, 14, ''], ['t', 260, 288, '= le fournisseur (AWS) gère', 'l']);
  return { w: 760, h: 300, cap: "Plus on va vers la droite, moins tu as de couches à gérer : en IaaS tu gères l’OS, en PaaS seulement ton code et tes données, en SaaS rien du tout.", el };
})()];

DG[3] = [{ w: 760, h: 265, cap: "Console, CLI, SDK ou CloudFormation : tout passe par la même API AWS, qui vérifie ton identité IAM avant d’agir sur les services.", el: [
  ['b', 20, 30, 170, 40, 'Console (web)'], ['b', 20, 85, 170, 40, 'CLI / CloudShell'], ['b', 20, 140, 170, 40, 'SDK (ton code)'], ['b', 20, 195, 170, 40, 'IaC (CloudFormation)'],
  ['b', 300, 85, 180, 95, 'API AWS|vérifie l’identité IAM|et les permissions', 'a'],
  ['a', 190, 50, 298, 105], ['a', 190, 105, 298, 122], ['a', 190, 160, 298, 145], ['a', 190, 215, 298, 165],
  ['b', 570, 100, 170, 65, 'Services|EC2, S3, RDS…', 'u'],
  ['a', 480, 132, 568, 132, 'requête autorisée']]},
{ w: 760, h: 150, cap: "Le root sert une seule fois à créer un administrateur ; ensuite on travaille avec des identités aux droits limités.", el: [
  ['b', 20, 30, 220, 60, 'Utilisateur root|accès total · MFA · rarement', 'r'],
  ['b', 300, 30, 220, 60, 'Administrateur|IAM / Identity Center', 'g'],
  ['b', 580, 30, 160, 60, 'Équipes|moindre privilège'],
  ['a', 240, 60, 298, 60, 'crée'], ['a', 520, 60, 578, 60, 'attribue'],
  ['t', 380, 130, 'Ensuite : créer une alerte AWS Budgets pour éviter les surprises sur la facture', 'm']]}];

DG[4] = [{ w: 760, h: 260, cap: "Chaque étape retire une couche à gérer : du serveur physique (tout est à toi) à la fonction Lambda (seulement ton code).", el: [
  ['b', 20, 170, 165, 50, 'Serveur physique|tu gères le matériel'],
  ['b', 205, 125, 165, 50, 'Machine virtuelle|EC2'],
  ['b', 390, 80, 165, 50, 'Conteneur|ECS, EKS, Fargate'],
  ['b', 575, 35, 165, 50, 'Fonction|Lambda', 'a'],
  ['a', 185, 185, 203, 160], ['a', 370, 140, 388, 115], ['a', 555, 95, 573, 70],
  ['a', 20, 245, 740, 245, 'moins de gestion · plus d’agilité · facturation plus fine', 'a']]}];

DG[5] = [{ w: 760, h: 285, cap: "Sur site, la capacité est fixe : soit tu paies du matériel inutilisé, soit tu perds des clients au pic. Dans le cloud, la capacité suit la demande.", el: [
  ['a', 60, 235, 730, 235], ['a', 60, 235, 60, 20],
  ['t', 725, 252, 'Temps', 'Rm'], ['t', 66, 18, 'Capacité / demande', 'lm'],
  ['p', '60,110 720,110', 'rx'],
  ['p', '60,200 120,185 180,160 240,170 300,120 360,90 420,130 480,70 540,60 600,110 660,150 720,140', 'k'],
  ['p', '60,170 150,170 150,145 270,145 270,110 330,110 330,80 450,80 450,55 590,55 590,100 640,100 640,130 720,130', 'a'],
  ['t', 150, 132, 'gaspillage : payé mais inutilisé', 'm'],
  ['t', 470, 48, 'clients perdus', 'r'],
  ['p', '80,268 120,268', 'k'], ['t', 128, 272, 'Demande réelle', 'l'],
  ['p', '270,268 310,268', 'a'], ['t', 318, 272, 'Capacité cloud (élastique)', 'l'],
  ['p', '520,268 560,268', 'rx'], ['t', 568, 272, 'Capacité fixe sur site', 'l']]}];

DG[6] = [{ w: 760, h: 300, cap: "Une région contient plusieurs zones de disponibilité isolées, chacune faite d’un ou plusieurs datacenters. Les edge locations, plus nombreuses, mettent le contenu en cache près des utilisateurs.", el: [
  ['b', 20, 20, 520, 260, 'Région (ex. ca-central-1)', 'd'],
  ...[40, 200, 360].flatMap((x, i) => [['b', x, 50, 150, 165, 'AZ ' + 'abc'[i], 'du'], ['b', x + 15, 85, 120, 40, 'Datacenter', 'n'], ['b', x + 15, 140, 120, 40, 'Datacenter', 'n']]),
  ['a', 190, 132, 200, 132, '', '2'], ['a', 350, 132, 360, 132, '', '2'],
  ['t', 280, 245, 'AZ isolées (énergie, réseau) mais reliées à faible latence', 'm'],
  ['t', 660, 30, 'Edge locations', 'b'],
  ['c', 610, 75, 26, 'Edge', 'a'], ['c', 700, 120, 26, 'Edge', 'a'], ['c', 615, 175, 26, 'Edge', 'a'],
  ['b', 590, 232, 150, 40, 'Utilisateurs'],
  ['a', 640, 230, 622, 203, 'rapide'],
  ['a', 584, 75, 542, 75, 'origine', 'x']]}];

DG[7] = [{ w: 760, h: 330, cap: "Haute disponibilité : si l’AZ a tombe, le Load Balancer envoie tout le trafic vers l’AZ b et RDS bascule automatiquement vers sa copie de secours.", el: [
  ['b', 310, 10, 140, 36, 'Utilisateurs'],
  ['b', 310, 66, 140, 36, 'Route 53 (DNS)'],
  ['b', 290, 122, 180, 36, 'Load Balancer', 'a'],
  ['a', 380, 46, 380, 64], ['a', 380, 102, 380, 120],
  ['b', 40, 180, 320, 140, 'AZ a', 'd'], ['b', 400, 180, 320, 140, 'AZ b', 'd'],
  ['b', 70, 210, 120, 40, 'EC2'], ['b', 430, 210, 120, 40, 'EC2'],
  ['a', 330, 158, 140, 208], ['a', 430, 158, 490, 208],
  ['b', 220, 262, 120, 44, 'RDS principale', 'u'], ['b', 580, 262, 120, 44, 'RDS secours'],
  ['a', 140, 250, 240, 260], ['a', 490, 250, 340, 270],
  ['a', 340, 296, 578, 296, 'réplication synchrone', 'a']]},
{ w: 760, h: 245, cap: "RPO = quantité de données perdues (depuis la dernière sauvegarde) ; RTO = durée d’arrêt. Plus on les veut courts, plus la stratégie de reprise coûte cher.", el: [
  ['a', 20, 80, 740, 80],
  ['p', '160,65 160,95'], ['p', '400,65 400,95', 'r'], ['p', '620,65 620,95', 'g'],
  ['t', 160, 55, 'Dernière sauvegarde'], ['t', 400, 55, 'Sinistre', 'rb'], ['t', 620, 55, 'Service rétabli', 'g'],
  ['a', 160, 115, 400, 115, 'RPO = données perdues', '2r'], ['a', 400, 115, 620, 115, 'RTO = temps d’arrêt', '2a'],
  ['b', 20, 145, 170, 46, 'Backup & Restore|heures · $'], ['b', 205, 145, 170, 46, 'Pilot Light|dizaines de min · $$'],
  ['b', 390, 145, 170, 46, 'Warm Standby|minutes · $$$'], ['b', 575, 145, 165, 46, 'Multi-site actif|≈ 0 · $$$$', 'a'],
  ['a', 20, 225, 740, 225, 'RPO/RTO plus courts → coût plus élevé']]}];

DG[8] = [{ w: 760, h: 270, cap: "En haut, CodePipeline enchaîne compilation, tests et déploiement à chaque modification. En bas, CloudFormation crée toute une infrastructure à partir d’un modèle texte.", el: [
  ['b', 20, 15, 720, 105, 'CodePipeline (orchestration CI/CD)', 'd'],
  ['b', 40, 50, 150, 50, 'Code source|GitHub / Git'], ['b', 235, 50, 150, 50, 'CodeBuild|compiler + tester', 'u'],
  ['b', 430, 50, 150, 50, 'CodeDeploy|déployer', 'u'], ['b', 615, 50, 115, 50, 'Cibles|EC2, Lambda, ECS', 'a'],
  ['a', 190, 75, 233, 75, 'commit'], ['a', 385, 75, 428, 75, 'artefact'], ['a', 580, 75, 613, 75],
  ['b', 40, 170, 170, 56, 'Modèle YAML / JSON|(ou code CDK)'], ['b', 290, 170, 150, 56, 'CloudFormation', 'u'],
  ['b', 520, 140, 220, 110, 'Pile (stack)', 'd'],
  ['b', 535, 180, 60, 34, 'VPC', 'n'], ['b', 605, 180, 60, 34, 'EC2', 'n'], ['b', 675, 180, 55, 34, 'RDS', 'n'],
  ['a', 210, 198, 288, 198, 'lu par'], ['a', 440, 198, 518, 198, 'crée']]}];

DG[9] = [{ w: 760, h: 330, cap: "Tout ce qui est en orange est ta responsabilité (sécurité DANS le cloud) ; tout ce qui est en bleu est celle d’AWS (sécurité DU cloud).", el: [
  ['b', 20, 15, 720, 175, 'CLIENT : sécurité DANS le cloud', 'da'],
  ['b', 40, 42, 680, 30, 'Données client', 'a'],
  ['b', 40, 78, 680, 30, 'Plateforme, applications, gestion des identités et des accès (IAM)', 'an'],
  ['b', 40, 114, 680, 30, 'OS invité (EC2), réseau et configuration du pare-feu (Security Groups)', 'an'],
  ['b', 40, 150, 220, 30, 'Chiffrement côté client', 'an'], ['b', 270, 150, 220, 30, 'Chiffrement côté serveur', 'an'], ['b', 500, 150, 220, 30, 'Protection du trafic réseau', 'an'],
  ['b', 20, 205, 720, 115, 'AWS : sécurité DU cloud', 'du'],
  ['b', 40, 232, 160, 30, 'Calcul', 'u'], ['b', 210, 232, 160, 30, 'Stockage', 'u'], ['b', 380, 232, 160, 30, 'Bases de données', 'u'], ['b', 550, 232, 170, 30, 'Réseau', 'u'],
  ['b', 40, 272, 680, 36, 'Infrastructure mondiale : régions · AZ · edge locations · matériel · sécurité physique', 'un']]}];

DG[10] = [{ w: 760, h: 160, cap: "Les services de calcul vont du contrôle total (EC2) à l’absence totale de gestion de serveurs (Lambda).", el: [
  ['b', 20, 30, 130, 56, 'EC2|serveur virtuel'], ['b', 170, 30, 130, 56, 'Lightsail|serveur simple'], ['b', 320, 30, 130, 56, 'ECS / EKS|conteneurs'],
  ['b', 470, 30, 130, 56, 'Fargate|conteneurs sans serveur', 'u'], ['b', 620, 30, 120, 56, 'Lambda|fonctions', 'a'],
  ['a', 20, 115, 740, 115, '', '2'], ['t', 20, 140, '← plus de contrôle', 'l'], ['t', 740, 140, 'moins de gestion →', 'R']]},
{ w: 760, h: 255, cap: "Le Load Balancer répartit le trafic ; quand CloudWatch voit le CPU monter, l’Auto Scaling group ajoute une instance (et en retire quand la charge baisse).", el: [
  ['b', 20, 105, 110, 40, 'Utilisateurs'], ['b', 175, 105, 135, 40, 'Load Balancer', 'a'], ['a', 130, 125, 173, 125],
  ['b', 360, 20, 230, 220, 'Auto Scaling group', 'd'],
  ['b', 400, 50, 150, 40, 'EC2'], ['b', 400, 110, 150, 40, 'EC2'], ['b', 400, 175, 150, 40, 'EC2 (ajoutée)', 'gx'],
  ['a', 310, 120, 398, 72], ['a', 310, 125, 398, 130], ['a', 310, 132, 398, 192, '', 'x'],
  ['b', 625, 110, 120, 50, 'CloudWatch|CPU > 70 %', 'u'],
  ['a', 550, 72, 655, 108, 'métriques', 'x'], ['a', 660, 162, 552, 192, 'alarme → +1', 'g']]}];

DG[11] = [{ w: 760, h: 245, cap: "EBS est un disque attaché à une instance dans une AZ ; EFS est partagé par plusieurs instances ; S3 stocke des objets accessibles par l’API HTTPS.", el: [
  ['t', 120, 20, 'Bloc : EBS', 'b'], ['t', 385, 20, 'Fichiers : EFS', 'b'], ['t', 640, 20, 'Objet : S3', 'b'],
  ['b', 30, 32, 180, 200, 'Une seule AZ', 'd'],
  ['b', 60, 60, 120, 40, 'EC2'], ['b', 60, 160, 120, 44, 'Volume EBS', 'u'], ['a', 120, 100, 120, 158, 'attaché', '2'],
  ['b', 275, 55, 66, 36, 'EC2'], ['b', 352, 55, 66, 36, 'EC2'], ['b', 429, 55, 66, 36, 'EC2'],
  ['b', 300, 160, 170, 48, 'EFS|multi-AZ, NFS (Linux)', 'u'],
  ['a', 308, 91, 340, 158, '', '2'], ['a', 385, 91, 385, 158, '', '2'], ['a', 462, 91, 430, 158, '', '2'],
  ['b', 565, 55, 150, 40, 'Appli / navigateur'], ['b', 550, 155, 180, 58, 'Bucket S3|photo.jpg, backup.zip…', 'a'],
  ['a', 640, 95, 640, 153, 'HTTPS (API)', '2']]},
{ w: 760, h: 215, cap: "Une politique de cycle de vie déplace les objets vers des classes de moins en moins chères à mesure qu’ils vieillissent (exemple de délais).", el: [
  ['b', 20, 30, 128, 60, 'Standard|accès fréquent'], ['b', 163, 30, 128, 60, 'Standard-IA|peu fréquent'],
  ['b', 306, 30, 128, 60, 'Glacier Instant|archive, accès ms'], ['b', 449, 30, 128, 60, 'Glacier Flexible|minutes → heures'],
  ['b', 592, 30, 148, 60, 'Glacier Deep Archive|12 – 48 h · le moins cher', 'a'],
  ['a', 148, 60, 161, 60], ['a', 291, 60, 304, 60], ['a', 434, 60, 447, 60], ['a', 577, 60, 590, 60],
  ['t', 155, 110, '30 j', 's'], ['t', 298, 110, '90 j', 's'], ['t', 441, 110, '180 j', 's'], ['t', 584, 110, '365 j', 's'],
  ['a', 20, 140, 740, 140, 'stockage moins cher →', 'g'], ['a', 20, 175, 740, 175, 'récupération plus lente et payante →', 'r'],
  ['t', 380, 205, 'S3 Intelligent-Tiering fait ces déplacements automatiquement selon l’usage réel', 'm']]}];

DG[12] = [{ w: 760, h: 235, cap: "Arbre de décision : on part du type de données pour choisir la base de données AWS.", el: [
  ['b', 290, 10, 180, 40, 'Quel type de données ?'],
  ['b', 40, 85, 200, 40, 'Relationnelles (SQL)'], ['b', 430, 85, 220, 40, 'NoSQL / spécialisées'],
  ['a', 330, 50, 160, 83], ['a', 430, 50, 530, 83],
  ['b', 20, 165, 120, 50, 'Transactions|RDS / Aurora', 'a'], ['b', 150, 165, 110, 50, 'Analytique|Redshift', 'u'],
  ['a', 120, 125, 80, 163, 'OLTP'], ['a', 160, 125, 205, 163, 'OLAP'],
  ...[['Clé-valeur', 'DynamoDB', 'a'], ['Documents', 'DocumentDB', ''], ['Graphe', 'Neptune', ''], ['Cache', 'ElastiCache', ''], ['Séries temp.', 'Timestream', '']]
    .flatMap(([a, b, f], i) => [['b', 275 + i * 94, 165, 88, 50, a + '|' + b, f], ['a', 540, 125, 319 + i * 94, 163]])]},
{ w: 760, h: 250, cap: "Multi-AZ = une copie de secours synchrone pour la DISPONIBILITÉ. Read Replica = une copie asynchrone en lecture pour la PERFORMANCE.", el: [
  ['b', 300, 10, 160, 40, 'Application'],
  ['b', 300, 110, 160, 50, 'RDS principale|AZ a', 'a'], ['a', 380, 50, 380, 108, 'lit + écrit'],
  ['b', 20, 110, 180, 50, 'Instance de secours|AZ b (Multi-AZ)', 'g'], ['a', 298, 135, 202, 135, 'synchrone', 'g'],
  ['t', 110, 185, 'disponibilité : basculement auto', 'g'],
  ['b', 560, 110, 180, 50, 'Read Replica|lecture seule', 'u'], ['a', 462, 135, 558, 135, 'asynchrone', 'u'],
  ['b', 560, 205, 180, 36, 'Rapports / analyses'], ['a', 650, 203, 650, 162, 'lectures', 'u'],
  ['t', 470, 230, 'performance en lecture →', 'Ru']]}];

DG[13] = [{ w: 760, h: 395, cap: "VPC typique : Load Balancer et NAT dans le sous-réseau public, serveurs et base de données dans le sous-réseau privé, lien VPN ou Direct Connect vers le datacenter.", el: [
  ['b', 300, 8, 160, 34, 'Internet'],
  ['b', 20, 70, 560, 295, 'VPC 10.0.0.0/16', 'd'],
  ['b', 310, 74, 140, 26, 'Internet Gateway', 'a'], ['a', 380, 42, 380, 72, '', '2'],
  ['b', 40, 105, 520, 95, 'Sous-réseau public', 'dg'],
  ['b', 70, 138, 160, 44, 'Load Balancer'], ['b', 340, 138, 160, 44, 'NAT Gateway'],
  ['b', 40, 220, 520, 130, 'Sous-réseau privé', 'du'],
  ['b', 70, 258, 160, 44, 'EC2|+ Security Group'], ['b', 340, 258, 160, 44, 'RDS'],
  ['a', 345, 100, 170, 136, 'entrée'], ['a', 200, 182, 200, 256], ['a', 230, 280, 338, 280],
  ['a', 222, 256, 380, 184, 'sortie seulement', 'x'], ['a', 420, 136, 405, 102, '', 'x'],
  ['b', 615, 240, 130, 50, 'Ton datacenter'], ['a', 613, 265, 582, 265, '', '2a'],
  ['t', 680, 312, 'VPN (Internet chiffré)', 's'], ['t', 680, 328, 'ou Direct Connect (privé)', 's'],
  ['t', 300, 385, 'NACL = filtre du sous-réseau (stateless) · Security Group = filtre de l’instance (stateful)', 'm']]}];

DG[14] = [{ w: 760, h: 300, cap: "Une instance EC2 se construit à partir d’une AMI ; on y ajoute un disque, un pare-feu, un rôle IAM et des clés. Son nom indique famille, génération, attributs et taille.", el: [
  ['b', 265, 75, 230, 130, 'Security Group (pare-feu)', 'd'],
  ['b', 295, 112, 170, 60, 'Instance EC2|m7g.xlarge', 'a'],
  ['b', 20, 30, 180, 44, 'AMI|OS + logiciels'], ['b', 20, 108, 180, 44, 'User data|script au démarrage'], ['b', 20, 186, 180, 44, 'Paire de clés|connexion SSH / RDP'],
  ['a', 200, 52, 293, 125], ['a', 200, 130, 293, 140], ['a', 200, 208, 293, 160],
  ['b', 560, 30, 180, 44, 'Volume EBS|disque persistant', 'u'], ['b', 560, 108, 180, 44, 'Rôle IAM|accès à S3, etc.', 'u'], ['b', 560, 186, 180, 44, 'Elastic IP|IP publique fixe', 'u'],
  ['a', 467, 125, 558, 52], ['a', 467, 140, 558, 130], ['a', 467, 160, 558, 208],
  ['b', 150, 248, 110, 42, 'm|famille'], ['b', 270, 248, 110, 42, '7|génération'], ['b', 390, 248, 110, 42, 'g|Graviton (ARM)'], ['b', 510, 248, 110, 42, '.xlarge|taille']]}];

DG[15] = [{ w: 760, h: 225, cap: "Rabais maximal par rapport à On-Demand : plus tu acceptes de contraintes (engagement ou interruption), moins tu paies.", el: [
  ['t', 20, 22, 'Rabais maximal par rapport à On-Demand', 'lb'],
  ['t', 190, 63, 'On-Demand', 'R'], ['b', 200, 40, 6, 36, ''], ['t', 216, 63, '0 % · aucun engagement', 'l'],
  ['t', 190, 123, 'Reserved / Savings Plans', 'R'], ['b', 200, 100, 360, 36, '', 'u'], ['t', 570, 123, '≈ 72 % · engagement 1 ou 3 ans', 'l'],
  ['t', 190, 183, 'Spot', 'R'], ['b', 200, 160, 450, 36, '', 'g'], ['t', 660, 183, '≈ 90 %', 'l'],
  ['t', 425, 183, 'interruptible avec 2 min de préavis', 's']]},
{ w: 760, h: 310, cap: "Pour choisir un modèle d’achat EC2, pose ces trois questions dans l’ordre.", el: [
  ['b', 20, 20, 230, 44, 'Peut être interrompu ?'], ['b', 330, 20, 170, 44, 'Spot', 'g'], ['a', 250, 42, 328, 42, 'oui'],
  ['b', 20, 100, 230, 44, 'Charge stable sur 1–3 ans ?'], ['b', 330, 100, 170, 44, 'Savings Plans / RI', 'u'], ['a', 250, 122, 328, 122, 'oui'],
  ['b', 20, 180, 230, 44, 'Licences par cœur / conformité ?'], ['b', 330, 180, 170, 44, 'Dedicated Host'], ['a', 250, 202, 328, 202, 'oui'],
  ['b', 20, 255, 230, 44, 'On-Demand', 'a'],
  ['a', 135, 64, 135, 98, 'non'], ['a', 135, 144, 135, 178, 'non'], ['a', 135, 224, 135, 253, 'non']]}];

DG[16] = [{ w: 760, h: 250, cap: "Les politiques donnent les droits : attachées à un groupe pour des personnes, ou à un rôle qu’un service (ici EC2) endosse pour obtenir des identifiants temporaires.", el: [
  ['b', 20, 25, 110, 36, 'Alice'], ['b', 20, 75, 110, 36, 'Bob'],
  ['b', 180, 45, 180, 46, 'Groupe Développeurs'], ['a', 130, 43, 178, 60], ['a', 130, 93, 178, 78],
  ['b', 440, 40, 200, 56, 'Politique JSON|Allow s3:GetObject', 'a'], ['a', 438, 68, 362, 68, 'attachée'],
  ['b', 20, 170, 110, 46, 'Instance EC2'], ['b', 180, 165, 190, 56, 'Rôle IAM|identifiants temporaires', 'u'], ['a', 130, 193, 178, 193, 'endosse'],
  ['b', 450, 170, 150, 46, 'Bucket S3'], ['a', 370, 193, 448, 193, 'accès autorisé', 'g'],
  ['a', 520, 98, 300, 163, 'attachée', 'x']]},
{ w: 760, h: 205, cap: "Évaluation IAM : un Deny explicite gagne toujours ; sans Allow explicite, la réponse est « refusé ».", el: [
  ['t', 380, 25, 'Par défaut tout est refusé · un Deny explicite l’emporte sur tout Allow', 'm'],
  ['b', 20, 60, 100, 44, 'Requête'], ['b', 160, 60, 160, 44, 'Deny explicite ?'], ['b', 380, 60, 160, 44, 'Allow explicite ?'],
  ['b', 600, 60, 140, 44, 'AUTORISÉ', 'g'], ['b', 160, 145, 160, 40, 'REFUSÉ', 'r'], ['b', 380, 145, 160, 40, 'REFUSÉ (implicite)', 'r'],
  ['a', 120, 82, 158, 82], ['a', 320, 82, 378, 82, 'non'], ['a', 540, 82, 598, 82, 'oui', 'g'],
  ['a', 240, 104, 240, 143, 'oui', 'r'], ['a', 460, 104, 460, 143, 'non', 'r']]}];

DG[17] = [{ w: 760, h: 275, cap: "SQS garde les messages jusqu’à ce qu’un consommateur vienne les chercher. SNS pousse immédiatement une copie à chaque abonné (fan-out).", el: [
  ['t', 20, 20, 'SQS : file d’attente (pull)', 'lb'],
  ['b', 20, 35, 140, 46, 'Producteur|site web'], ['b', 230, 35, 260, 46, 'File SQS  ✉ ✉ ✉ ✉', 'a'], ['b', 560, 35, 180, 46, 'Consommateur|traite à son rythme'],
  ['a', 160, 58, 228, 58, 'envoie'], ['a', 492, 58, 558, 58, 'récupère'],
  ['t', 20, 130, 'SNS : publication / abonnement (push)', 'lb'],
  ['b', 20, 180, 140, 46, 'Éditeur|nouvelle commande'], ['b', 230, 180, 160, 46, 'Rubrique SNS', 'u'], ['a', 160, 203, 228, 203, 'publie'],
  ['b', 500, 145, 240, 32, 'Email / SMS à l’équipe'], ['b', 500, 187, 240, 32, 'File SQS → facturation'], ['b', 500, 229, 240, 32, 'Lambda → analyse'],
  ['a', 390, 196, 498, 161, 'push', 'u'], ['a', 390, 203, 498, 203, '', 'u'], ['a', 390, 210, 498, 245, '', 'u']]}];

DG[18] = [{ w: 760, h: 290, cap: "Chaque machine virtuelle transporte son propre OS (lourd) ; les conteneurs partagent l’OS de l’hôte via le moteur Docker (léger, démarrage en secondes).", el: [
  ['t', 190, 22, 'Machines virtuelles', 'b'], ['t', 570, 22, 'Conteneurs', 'b'],
  ['b', 20, 240, 340, 34, 'Infrastructure (serveur)', 'n'], ['b', 20, 200, 340, 34, 'Hyperviseur', 'n'],
  ...[20, 135, 250].flatMap(x => [['b', x, 160, 110, 34, 'OS invité', 'r'], ['b', x, 120, 110, 34, 'Bibliothèques', 'n'], ['b', x, 80, 110, 34, 'App', 'a']]),
  ['b', 400, 240, 340, 34, 'Infrastructure (serveur)', 'n'], ['b', 400, 200, 340, 34, 'OS hôte (partagé)', 'n'], ['b', 400, 160, 340, 34, 'Moteur Docker', 'u'],
  ...[400, 515, 630].flatMap(x => [['b', x, 120, 110, 34, 'Bibliothèques', 'n'], ['b', x, 80, 110, 34, 'App', 'a']])]},
{ w: 760, h: 120, cap: "Cycle de vie d’un conteneur sur AWS : construire l’image, la stocker dans ECR, puis la faire exécuter par ECS ou EKS, sur EC2 ou Fargate.", el: [
  ['b', 20, 35, 110, 48, 'Dockerfile'], ['b', 160, 35, 100, 48, 'Image'], ['b', 290, 35, 130, 48, 'Amazon ECR|registre', 'u'],
  ['b', 450, 35, 130, 48, 'ECS ou EKS|orchestration'], ['b', 610, 35, 130, 48, 'Exécution|EC2 ou Fargate', 'a'],
  ['a', 130, 59, 158, 59, 'build'], ['a', 260, 59, 288, 59, 'push'], ['a', 420, 59, 448, 59, 'pull'], ['a', 580, 59, 608, 59, 'lance']]}];

DG[19] = [{ w: 760, h: 295, cap: "AWS Organizations : un compte de gestion paie pour tous ; les comptes sont rangés dans des OU, et chaque OU reçoit des SCP qui plafonnent ce qui est permis.", el: [
  ['b', 270, 10, 220, 50, 'Compte de gestion|facturation consolidée', 'a'],
  ['b', 310, 85, 140, 34, 'Racine (Root)'], ['a', 380, 60, 380, 83],
  ['b', 40, 150, 320, 130, 'OU Production', 'd'], ['b', 400, 150, 320, 130, 'OU Développement', 'd'],
  ['a', 340, 119, 200, 148], ['a', 420, 119, 560, 148],
  ['b', 60, 178, 280, 30, 'SCP : interdire hors régions UE', 'rn'], ['b', 420, 178, 280, 30, 'SCP : interdire les grosses instances', 'rn'],
  ['b', 60, 225, 130, 36, 'Compte App A', 'n'], ['b', 210, 225, 130, 36, 'Compte App B', 'n'],
  ['b', 420, 225, 130, 36, 'Compte Dev', 'n'], ['b', 570, 225, 130, 36, 'Compte Sandbox', 'n']]}];

DG[20] = [{ w: 760, h: 280, cap: "CloudFormation crée exactement ce que décrit le modèle. Elastic Beanstalk part de ton code et crée l’environnement (Load Balancer, Auto Scaling, EC2) à ta place.", el: [
  ['b', 20, 40, 140, 50, 'Modèle|template.yaml'], ['b', 220, 40, 150, 50, 'CloudFormation', 'u'],
  ['b', 430, 15, 310, 100, 'Pile (stack)', 'd'],
  ['b', 450, 52, 80, 40, 'EC2', 'n'], ['b', 545, 52, 80, 40, 'RDS', 'n'], ['b', 640, 52, 80, 40, 'S3', 'n'],
  ['a', 160, 65, 218, 65, 'lu par'], ['a', 370, 65, 428, 65, 'crée'],
  ['t', 585, 135, 'modifié à la main ? → détection de dérive (drift)', 'm'],
  ['b', 20, 190, 140, 50, 'Ton code|app.zip'], ['b', 220, 190, 150, 50, 'Elastic Beanstalk', 'a'],
  ['b', 430, 165, 310, 100, 'Environnement créé pour toi', 'd'],
  ['b', 445, 202, 95, 40, 'Load Balancer', 'n'], ['b', 545, 202, 95, 40, 'Auto Scaling', 'n'], ['b', 645, 202, 85, 40, 'EC2', 'n'],
  ['a', 160, 215, 218, 215, 'envoie'], ['a', 370, 215, 428, 215, 'provisionne']]}];

DG[21] = [{ w: 760, h: 265, cap: "Application 100 % serverless : site statique via CloudFront + S3, API via API Gateway + Lambda, données dans DynamoDB, connexion via Cognito. Aucun serveur à gérer.", el: [
  ['b', 20, 110, 110, 44, 'Utilisateurs'],
  ['b', 190, 30, 140, 44, 'CloudFront|CDN'], ['b', 400, 30, 150, 44, 'S3|site statique'],
  ['b', 190, 185, 140, 44, 'API Gateway', 'u'], ['b', 400, 185, 130, 44, 'Lambda|ton code', 'a'], ['b', 600, 185, 140, 44, 'DynamoDB|données', 'u'],
  ['b', 600, 100, 140, 44, 'Cognito|connexion'],
  ['a', 130, 125, 188, 58, 'pages'], ['a', 330, 52, 398, 52], ['a', 130, 140, 188, 200, 'appels API'],
  ['a', 330, 207, 398, 207], ['a', 530, 207, 598, 207, 'lit / écrit'], ['a', 320, 185, 598, 128, 'vérifie le jeton', 'x'],
  ['t', 380, 255, 'paiement à la requête · mise à l’échelle automatique', 'm']]}];

DG[22] = [{ w: 760, h: 275, cap: "Écosystème Microsoft sur AWS : l’Active Directory sur site est relié à un AD managé sur AWS, qui authentifie serveurs Windows, partages FSx et bureaux WorkSpaces.", el: [
  ['b', 20, 20, 220, 240, 'Sur site', 'd'], ['b', 40, 60, 180, 44, 'Active Directory'], ['b', 40, 180, 180, 44, 'Employés'],
  ['b', 330, 20, 410, 240, 'AWS', 'd'],
  ['b', 350, 50, 370, 48, 'AWS Managed Microsoft AD|ou AD Connector', 'u'],
  ['b', 350, 130, 175, 44, 'EC2 Windows'], ['b', 545, 130, 175, 44, 'FSx for Windows|partage SMB'],
  ['b', 545, 195, 175, 44, 'RDS SQL Server'], ['b', 350, 195, 175, 44, 'WorkSpaces|bureaux virtuels', 'a'],
  ['a', 220, 80, 348, 74, 'approbation', '2u'], ['a', 437, 98, 437, 128, '', 'x'], ['a', 632, 98, 632, 128, '', 'x'],
  ['a', 220, 210, 348, 217, 'se connectent', 'a']]}];

DG[23] = [{ w: 760, h: 300, cap: "Trois questions, trois services : CloudTrail dit QUI a fait l’action, CloudWatch dit COMMENT la ressource se porte, Config dit QUELLE configuration elle avait.", el: [
  ['b', 20, 20, 150, 40, 'Administrateur'], ['b', 290, 120, 180, 56, 'Tes ressources|EC2, S3, RDS…', 'a'],
  ['a', 170, 45, 300, 118, 'appel API'],
  ['b', 20, 225, 210, 56, 'CloudTrail|QUI a fait QUOI, QUAND'], ['a', 300, 176, 200, 223, 'journalise'],
  ['b', 540, 15, 200, 56, 'CloudWatch|métriques, logs, alarmes', 'u'], ['a', 470, 130, 538, 55, 'CPU, logs', 'u'],
  ['b', 580, 115, 160, 50, 'Alarme|SNS, Auto Scaling', 'r'], ['a', 640, 71, 655, 113, 'seuil', 'r'],
  ['b', 540, 225, 200, 56, 'Config|historique de configuration', 'g'], ['a', 470, 165, 560, 223, 'changement', 'g']]}];

DG[24] = [{ w: 760, h: 150, cap: "Chaîne big data typique : ingérer en temps réel, stocker dans un data lake S3, transformer avec Glue, interroger, puis visualiser.", el: [
  ['b', 20, 30, 115, 56, 'Sources|applis, IoT, logs'], ['b', 150, 30, 115, 56, 'Kinesis', 'u'], ['b', 280, 30, 115, 56, 'S3|data lake', 'a'],
  ['b', 410, 30, 115, 56, 'Glue|ETL + catalogue'], ['b', 540, 30, 105, 56, 'Athena /|Redshift', 'u'], ['b', 660, 30, 85, 56, 'QuickSight'],
  ['a', 135, 58, 148, 58], ['a', 265, 58, 278, 58], ['a', 395, 58, 408, 58], ['a', 525, 58, 538, 58], ['a', 645, 58, 658, 58],
  ['t', 207, 110, 'Ingérer', 'm'], ['t', 337, 110, 'Stocker', 'm'], ['t', 467, 110, 'Transformer', 'm'], ['t', 592, 110, 'Analyser', 'm'], ['t', 702, 110, 'Visualiser', 'm']]},
{ w: 760, h: 235, cap: "Les 4 niveaux de l’IA sur AWS : plus on monte, moins il faut de compétences en ML.", el: [
  ['b', 20, 15, 720, 44, 'Services d’IA prêts à l’emploi : Rekognition · Textract · Comprehend · Transcribe · Polly · Translate · Lex', 'gn'],
  ['b', 20, 68, 720, 44, 'IA générative : Amazon Bedrock (modèles de fondation) · Amazon Q', 'an'],
  ['b', 20, 121, 720, 44, 'Plateforme ML : SageMaker AI (construire, entraîner, déployer TES modèles)', 'un'],
  ['b', 20, 174, 720, 44, 'Infrastructure : instances GPU (P, G), puces Trainium et Inferentia', 'n']]}];

DG[25] = [{ w: 760, h: 285, cap: "Les 6 piliers du Well-Architected Framework, posés sur des principes de conception communs.", el: [
  ['p', '20,72 380,14 740,72', 'az'], ['t', 380, 58, 'AWS Well-Architected Framework', 'b'],
  ...['Excellence|opération-|nelle', 'Sécurité', 'Fiabilité', 'Efficacité|des perfor-|mances', 'Optimisation|des coûts', 'Durabilité'].map((l, i) => ['b', 30 + i * 120, 82, 100, 140, l, i === 1 ? 'u' : '']),
  ['b', 20, 232, 720, 38, 'Base : automatiser · multi-AZ · infrastructure as code · moindre privilège · payer à l’usage', 'n']]}];

DG[26] = [{ w: 760, h: 275, cap: "Le TCO sur site ressemble à un iceberg : le prix des serveurs n’est que la partie visible.", el: [
  ['p', '300,90 380,28 460,90', 'z'], ['t', 480, 50, 'Visible : achat des serveurs', 'lb'],
  ['p', '20,90 740,90', 'ux'],
  ['p', '200,92 560,92 625,175 525,262 240,262 150,172', 'uz'],
  ['t', 380, 125, 'Électricité · Refroidissement'], ['t', 380, 150, 'Locaux · Sécurité physique'], ['t', 380, 175, 'Personnel IT · Maintenance'],
  ['t', 380, 200, 'Licences · Réseau'], ['t', 380, 225, 'Renouvellement du matériel · capacité inutilisée', 's'],
  ['t', 700, 110, 'Coûts cachés', 'Ru']]},
{ w: 760, h: 145, cap: "Les 7 R de migration, du moins au plus transformateur (ordre approximatif) : plus on transforme, plus on profite du cloud, mais plus c’est long.", el: [
  ...[['Retire', 'supprimer'], ['Retain', 'garder'], ['Relocate', 'VMware'], ['Rehost', 'tel quel'], ['Replatform', 'ajustements'], ['Repurchase', 'SaaS'], ['Refactor', 'réécrire']]
    .map(([a, b], i) => ['b', 20 + i * 104, 20, 96, 52, a + '|' + b, i === 3 ? 'u' : i === 6 ? 'a' : '']),
  ['a', 20, 105, 740, 105, 'effort et bénéfices cloud croissants →']]}];

DG[27] = [{ w: 760, h: 140, cap: "Les outils de coûts selon le moment : estimer avant, surveiller pendant, analyser après.", el: [
  ['b', 20, 15, 230, 110, 'AVANT', 'd'], ['b', 265, 15, 230, 110, 'PENDANT', 'd'], ['b', 510, 15, 230, 110, 'APRÈS', 'd'],
  ['b', 40, 50, 190, 56, 'Pricing Calculator|estimer', 'a'],
  ['b', 280, 50, 100, 56, 'Budgets|alertes', 'r'], ['b', 385, 50, 100, 56, 'Anomaly|Detection'],
  ['b', 525, 50, 100, 56, 'Cost Explorer|analyser, prévoir', 'u'], ['b', 630, 50, 100, 56, 'CUR|détail max']]},
{ w: 760, h: 225, cap: "Les plans de support : chaque marche ajoute un accès plus rapide (délai pour le cas le plus grave) et plus d’accompagnement.", el: [
  ...[['Basic', 'gratuit · pas de tech', ''], ['Developer', 'email · < 12 h', ''], ['Business', '24/7 · < 1 h', 'u'], ['Ent. On-Ramp', 'pool de TAM · < 30 min', ''], ['Enterprise', 'TAM dédié · < 15 min', 'a']]
    .map(([a, b, f], i) => ['b', 20 + i * 146, 165 - i * 35, 134, 50, a + '|' + b, f])]}];

DG[28] = [{ w: 760, h: 330, cap: "Défense en profondeur : chaque couche a ses services ; un attaquant doit franchir toutes les couches pour atteindre les données. L’identité (IAM, MFA) s’applique partout.", el: [
  ['b', 20, 10, 720, 310, 'Physique : datacenters AWS', 'd'],
  ['b', 45, 38, 670, 272, 'Périmètre : Shield, CloudFront, Route 53', 'd'],
  ['b', 70, 66, 620, 234, 'Réseau : VPC, NACL, Network Firewall', 'du'],
  ['b', 95, 94, 570, 196, 'Instance : Security Groups, Inspector, correctifs', 'd'],
  ['b', 120, 122, 520, 158, 'Application : WAF, Cognito', 'dg'],
  ['b', 230, 175, 300, 64, 'Données|KMS (chiffrement) · Macie · sauvegardes', 'a']]},
{ w: 760, h: 195, cap: "Détection et réponse : les détecteurs envoient leurs résultats à Security Hub ; EventBridge peut déclencher une correction automatique, Detective aide à enquêter.", el: [
  ['b', 20, 15, 150, 44, 'GuardDuty|menaces'], ['b', 20, 72, 150, 44, 'Inspector|vulnérabilités'], ['b', 20, 129, 150, 44, 'Macie|données sensibles'],
  ['b', 250, 65, 160, 60, 'Security Hub|vue centralisée', 'a'],
  ['a', 170, 37, 248, 80], ['a', 170, 94, 248, 94], ['a', 170, 151, 248, 110],
  ['b', 470, 30, 130, 44, 'EventBridge'], ['b', 630, 30, 110, 44, 'Lambda|corrige', 'g'],
  ['b', 470, 120, 270, 44, 'Detective|enquête sur la cause racine', 'u'],
  ['a', 410, 85, 468, 55], ['a', 600, 52, 628, 52], ['a', 410, 105, 468, 135, '', 'x']]}];

DG[29] = [{ w: 760, h: 290, cap: "À gauche, les trois services de surveillance qu’on confond. À droite, où se placent Shield et WAF sur le chemin d’une requête.", el: [
  ['b', 140, 115, 120, 40, 'Ressource', 'a'],
  ['b', 20, 20, 140, 46, 'CloudTrail|QUI a agi ?'], ['b', 230, 20, 160, 46, 'CloudWatch|COMMENT ça va ?', 'u'], ['b', 120, 215, 160, 46, 'Config|QUELLE config ?', 'g'],
  ['a', 175, 113, 100, 68], ['a', 230, 113, 300, 68, '', 'u'], ['a', 200, 155, 200, 213, '', 'g'],
  ['p', '420,15 420,275', 'x'],
  ['b', 480, 10, 220, 34, 'Trafic (dont attaques)'],
  ['b', 480, 64, 220, 40, 'Shield|DDoS, couches 3-4', 'u'],
  ['b', 480, 124, 220, 40, 'CloudFront|cache en edge'],
  ['b', 480, 184, 220, 40, 'WAF|SQLi, XSS (couche 7)', 'a'],
  ['b', 480, 244, 220, 36, 'Application'],
  ['a', 590, 44, 590, 62], ['a', 590, 104, 590, 122], ['a', 590, 164, 590, 182], ['a', 590, 224, 590, 242]]}];
