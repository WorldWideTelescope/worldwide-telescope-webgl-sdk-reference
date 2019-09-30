import {webglReadme, folder, place} from './webglsdkdata';

const lineSep = '<!-- ====================================================================== -->\n\n';

let groupLinks = {};

let classData = folder; // change to [webglreadme, folder, place] update each doc
let groups = {getters:'Getter', setters:'Setter', methods:'Method', events:'Event'};
export const genMarkdown = () => {
  toc = [];

  let body = Object.keys(groups).map(key => itemText(classData, key)).join('\n');
  return content(classData.head) + body;
};

export const itemText = (data, key) => {
  //console.log({key});
  let group = data[key];
  if (!group){
    return '';
  }
  let type = groups[key];
  let intro = group[key];
  toc.push(intro.find(item => item.h).h);
  groupLinks = {};

  const keys = Object.keys(group).filter(k => k !== key);
  const items = keys.map(k => group[k]);
  if (!items.length){
    return '';
  }
  keys.forEach(k => groupLinks[k] = `#${k}-${type}`);
  let groupTable = {};
  let niTable = {};
  let ndTable = {};
  keys.forEach(key => {
    let t = group[key].implemented && group[key].documented ? groupTable : !group[key].documented ? ndTable : niTable;
    t[key] = group[key].desc || '-';
  });
  const table = ptable(groupTable, type, true);
  const inactiveTable = Object.keys(niTable).length ?
    `${h4(`Not Implemented ${type}s`)}\n${ptable(niTable, type)}\n\n` :
    '';
  const undocTable = Object.keys(ndTable).length ?
    `${h4(`Not documented ${type}s`)}\n${ptable(ndTable, type)}\n\n` :
    '';
  const txt = items/*.filter(item => item.documented && item.implemented)*/.map((item, i) => `${lineSep}
${hdg(keys[i] + ' ' + type, 2)}
${item.implemented === false ? nyi : ''}${item.documented === false ? notDocumented : item.content && content(item.content)}`);
  return `\n\n${lineSep}
[Top]
${content(intro)}
${lineSep}
${table}\n\n
${inactiveTable}${undocTable}
${txt.join('\n\n\n')}\n\n${mdLinks()}`;

};

let toc = [];

const tofc = () => {
  const lnk = h => h.toLowerCase().split(' ').join('-');
  let links = toc.map(h => `[**${h}**]: #${lnk(h)}`);
  links.push(`[Top]: #${lnk(classData.head.find(hd => hd.h).h)}`);
  let tbl = toc.map(h => ` - [**${h}**]`);

  return `Jump to section:\n${tbl.join('\n')}\n\n${links.join('\n')}`;
};

const mdLinks = () => {
  let links = Object.keys(groupLinks).map(key => mdLink(key, groupLinks[key]).toLowerCase());
  let objAliases = links.filter(l => l.indexOf(' class') > 0).map(c => c.replace(' class', ' object'));
  let plainAliases = objAliases.map(c => c.replace(' object', ''));

  return [...links, ...objAliases, ...plainAliases].join('');
};
const mdLink = (l, to) => `[**${l}**${to.startsWith('#') ? '' : ' class'}]: ${to.startsWith('#') ? hash(to) : md(l)}\n`;
const hash = to => `${to.split('-')[0]}-${to.split('-')[1]}`;
const md = to => `./${to.toLowerCase()}.md`;
const content = items =>
  items ? items.map(item => {
    const key = Object.keys(item)[0];
    /*if (key === 'example'){
        console.log(item[key]);
      }*/
    if (helpers[key])
      return helpers[key](item[key]);
    return '';
  }).join('\n\n') : '';

const text = (t) => {
  if (t === null || t === undefined){
    t = 'None.';
  }
  t = t + '';
  let linkTest = /\*\*([^\s]+?)\*\*/ig;
  let parse = txt => {
    try{
      if (txt.match(linkTest)){
        let links = txt.match(linkTest).map(l => l.replace(/\*\*/g, ''));
        //console.log({links});
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        links.forEach(l => groupLinks[l] = groupLinks[l] || 'text');

      }
    }catch(ex){
      return txt;
    }
    return txt.replace(/\n/g, ' ').replace('  ', ' ');
  };
  return Array.isArray(t) ? '\n' + t.map(t => `${parse(t)}`).join('\n') : `${t ? parse(t) : 'None.'}`;
};

const initialCap = s => `${s.charAt(0).toUpperCase()}${s.substr(1)}`;

const rem = (r, h = 'Remarks') => `${h4(h)}\n${text(r)}`;

const ptable = (o, type = 'Name', link = false) => {
  if (!o){
    return 'None.';
  }
  let names = Object.keys(o);
  let descriptions = Object.values(o).map(v => v.toString());
  let max = (txt) => Math.max.apply(this, txt.map(t => t.length));
  let maxName = Math.max(type.length, max(names));
  if (link){
    maxName += 4;
  }
  let maxDescription = Math.max(11, max(descriptions));

  let rows = () => names.map(name => row(name, o[name])).join('\n');
  let nameMd = name => link ? `[**${name}**]` : `_${name}_`;
  let row = (name, desc) => `| ${nameMd(name).padEnd(maxName + 2, ' ')} | ${(text(desc)).padEnd(maxDescription, ' ')} |`;

  return names.length ? `
| ${(type).padEnd(maxName + 2, ' ')} | ${('Description').padEnd(maxDescription, ' ')} |
|${(':').padEnd(maxName + 4, '-')}|${(':').padEnd(maxDescription + 2, '-')}|
${rows()}` : '';
};


const params = (o) => `${h4('Parameters')}\n${ptable(o)}`;
const img = img => `![${img[1]}](images/${img[0]}.jpg)`;
const nyi = 'Not yet implemented. This is a stub.\n';
const notDocumented = 'Not documented at this time.';
const syn = c => example(c, 'Syntax');
const xlink = l => rem(l, `Relevant Examples`);
const example = (c, h = 'Example Code') => `${h4(h)}\n${code(c)}`;
const code = (c, lang = 'js') => `\`\`\`${lang}
${c.replace(/wwt.wc/g, 'wwt_ctl')}
\`\`\``;
const html = c => code(c, 'markup');
const returns = (desc) => {
  const nullText = 'This method does not return a value.';
  return `
${hdg('Return Value')}
${desc || nullText}`;
};
const hd = h => hdg(h, 1);

const h4 = h => hdg(h);
const hdg = (txt, l = 4) => `\n${('').padStart(l, '#')} ${txt}`;
const desc = d => `---
  description: ${d}
---`;


let helpers = {desc, text, html, ptable, params, img, nyi, syn, xlink, example, code, returns, h:hd, h4, hdg, rem, tofc};
