// ok the board
let board_cnt_cnt= document.getElementById('board-cnt-cnt');
let board_cnt= document.getElementById('board-cnt');
let board= document.getElementById('board');
board_cnt_cnt.addEventListener('mouseenter', ()=>{
  board.classList.add('stop');
});
board_cnt_cnt.addEventListener('mouseleave', ()=>{
  board.classList.remove('stop');
});
let left_counter;
setInterval(() => {
  if(!board.classList.contains('stop')){
    if(-board.offsetWidth/2>board_cnt.offsetWidth+board.offsetWidth/2-left_counter){
      left_counter= 1;
    }
    board.style.left= `${board_cnt.offsetWidth+board.offsetWidth/2-left_counter}px`;
    left_counter++;
  }
}, 10);

// ok the log-1
function add_message(message){
  left_counter=1;
  board.textContent= message;
}
function set_time(){
  let today= new Date();
  let time= `${today.getHours()}:${(today.getMinutes() < 10) ? '0'.concat(today.getMinutes()) : today.getMinutes()}`;
  return time;
}
function add_div(alert, message, error_val){
  let log_cnt= document.getElementById('log-cnt');
  let no_error_classes= ['bg-c-yellow-8', 'hover:bg-c-yellow-9', 'bg-c-yellow-12'];
  let error_classes= ['bg-c-red', 'hover:bg-c-red-2', 'bg-c-red-3'];
  let classes= (error_val == 'error') ? error_classes : no_error_classes;
  log_cnt.insertAdjacentHTML('afterbegin' ,`
  <div class="flex border-b border-c-gray-21 h-c-17">
    <button class="w-4/5 flex justify-center items-center ${classes[0]} ${classes[1]} transition-colors duration-100 whitespace-nowrap alert" onclick="add_message('${message}')">
      ${alert}
    </button>
    <div class="w-1/5 flex justify-center items-center ${classes[2]} border-l border-c-gray-22">
      ${set_time()}
    </div>
  </div>`);
  let alerts= document.getElementsByClassName('alert');
  alerts[0].click();
}
add_div('User Entered','It`s time to start decoding!','no-error');

// ok the top form
let add_btn= document.getElementById('add-btn');
let input= document.getElementById('input');
let output= document.getElementById('output');
let inputs= document.getElementsByClassName('input');
let tbody= document.getElementsByTagName('tbody');
let tr_counter= 0;
let farsi= /^[آـابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ ‌/!؟،:.؛«»۰۱۲۳۴۵۶۷۸۹]+$/;
let farsi_number= /^[۰۱۲۳۴۵۶۷۸۹]+$/;
add_btn.addEventListener('click', (e)=>{
  e.preventDefault();
  if(input.value == '' && output.value == ''){
    add_div('Error 100','Fill both forms!','error');
  }
  else if(input.value == '' && output.value != ''){
    add_div('Error 101','Fill both forms!','error');
  }
  else if(input.value != '' && output.value == ''){
    add_div('Error 110','Fill both forms!','error');
  }
  else{
    let flag= 0;
    for(let i=0; i<tr_counter; i++){
      if(inputs[i] && inputs[i].value == input.value){
        add_div('Error 111','The input is already added!','error');
        flag= 1;
        break;
      }
    }
    if(flag == 0){
      add_div('Row Added','Now start decoding or add more rows to your table!','no-error');
      tr_counter++;
      add_tr(tr_counter,
        input.value, 
        output.value,
        '[add some notes]',
        '');
      input.value='';
      output.value='';
      input.focus();
      fix_farsi_2(input);
      fix_farsi_2(output);
    }
  }
});

function add_tr(number, input, output, pre_note, note){
  let farsi_classes= ['font-b-mitra', 'text-c-2', 'tracking-c-2', '[word-spacing:.05vw]', '[direction:rtl]'];
  let input_classes= (farsi.test(input)) ? farsi_classes : '';
  let output_classes= (farsi.test(output)) ? farsi_classes : '';
  tbody[0].insertAdjacentHTML('beforeend' ,`
  <tr class="h-c-3 flex border-b border-c-gray-25 group">
    <td class="w-1/6 flex justify-center items-center group-hover:bg-white transition-colors duration-100 bg-gray-50 text-c-gray-20 number">${number}</td>
    <td class="w-1/6 border-l border-c-gray-25 whitespace-nowrap">
      <input onkeydown="fix_farsi(this)" onkeyup="fix_farsi_2(this)" value="${input}" class="group-hover:bg-white bg-gray-50 focus:bg-white transition-colors duration-100 placeholder:text-c-gray-20 text-c-gray-20 focus:text-black focus:outline-none h-full w-full px-c-15 text-center${(input_classes[0]) ? ' '.concat(input_classes[0]) : ''}${(input_classes[1]) ? ' '.concat(input_classes[1]) : ''}${(input_classes[2]) ? ' '.concat(input_classes[2]) : ''}${(input_classes[3]) ? ' '.concat(input_classes[3]) : ''}${(input_classes[4]) ? ' '.concat(input_classes[4]) : ''} input" placeholder="Input" type="text" spellcheck="false">
    </td>
    <td class="w-1/6 border-l border-c-gray-25 whitespace-nowrap">
      <input onkeydown="fix_farsi(this)" onkeyup="fix_farsi_2(this)" value="${output}" class="group-hover:bg-white bg-gray-50 focus:bg-white transition-colors duration-100 placeholder:text-c-gray-20 text-c-gray-20 focus:text-black focus:outline-none h-full w-full px-c-15 text-center${(output_classes[0]) ? ' '.concat(output_classes[0]) : ''}${(output_classes[1]) ? ' '.concat(output_classes[1]) : ''}${(output_classes[2]) ? ' '.concat(output_classes[2]) : ''}${(output_classes[3]) ? ' '.concat(output_classes[3]) : ''}${(output_classes[4]) ? ' '.concat(output_classes[4]) : ''} output" placeholder="Output" type="text" spellcheck="false">
    </td>
    <td class="w-3/6 border-l border-c-gray-25 whitespace-nowrap">
      <input onkeydown="fix_farsi(this)" onkeyup="fix_farsi_2(this)" value="${note}" class="group-hover:bg-white bg-gray-50 focus:bg-white transition-colors duration-100 placeholder:text-c-gray-20 text-c-gray-20 focus:text-black focus:outline-none h-full w-full px-c-15 text-center note" placeholder="${pre_note}" type="text" spellcheck="false">
    </td>
  </tr>`);
}

// ok the delete button
let delete_btn= document.getElementById('delete-btn');
let file_name_elm= document.getElementById('file-name');
let file_format_elm= document.getElementById('file-format');
delete_btn.addEventListener('click', ()=>{
  if(tbody[0].children.length == 0){
    add_div('Error 300','There is nothing to delete!','error');
  }
  else{
    add_div('Table Deleted','Go create a table again, or close the web app!','no-error');
    tbody[0].innerHTML= '';
    tr_counter= 0;
    file_name_elm.textContent= 'Nothing Uploaded Yet...';
    file_format_elm.textContent= 'Nothing Uploaded Yet...';
  }
});

// ok the download button
let download_btn= document.getElementById('download-btn');
let table_name= document.getElementById('table-name');
let number= document.getElementsByClassName('number');
let outputs= document.getElementsByClassName('output');
let notes= document.getElementsByClassName('note');
download_btn.addEventListener('click', ()=>{
  if(tr_counter == 0){
    add_div('Error 400','No table found to download!','error');
  }
  else if(tr_counter > 0 && table_name.value == ''){
    add_div('Error 410','Name the table to download it!','error');
  }
  else{
    add_div('Table Downloaded','Now you can upload and use the table at anytime!','no-error');
    const table= {
      number: [],
      input: [],
      output: [],
      note: []
    };
    for(let i=0; i<tr_counter; i++){
      table.number[i]= number[i].textContent;
      table.input[i]= inputs[i].value;
      table.output[i]= outputs[i].value;
      table.note[i]= notes[i].value;
    }
    const a= document.createElement("a");
    a.href= URL.createObjectURL(new Blob([JSON.stringify(table, null, 2)], {
      type:"text/plain"
    }));
    a.setAttribute("download", `${table_name.value}.txt`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
});

// ok the upload button
let upload_btn= document.getElementById('upload-btn');
upload_btn.addEventListener('change', function(e){
  // https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
  const fileList= this.files;
  let info= fileList[0].name;
  let file_name= info.substring(0, info.lastIndexOf('.'));
  let file_format= info.substring(info.lastIndexOf('.')+1, info.length);
  file_name_elm.textContent= file_name;
  file_format_elm.textContent= file_format;
  if(file_format == 'txt'){
    // https://www.geeksforgeeks.org/how-to-read-a-local-text-file-using-javascript/
    let fr= new FileReader();
    fr.onload= function(){
      let code_values=fr.result;
      let table_values= JSON.parse(code_values);
      let flag= 0;
      for(let i=0; i<table_values.input.length; i++){
        for(let j=0; j<inputs.length; j++){
          if(table_values.input[i] == inputs[j].value){
            flag= 1;
            break;
          }
        }
      }
      if(flag == 1){
        add_div('Error 210','Similiar input(s) found!','error');
      }
      else{
        add_div('Table Uploaded','Now start decoding or add more rows to your table!','no-error');
        for(let i=0; i<table_values.number.length ; i++){
          tr_counter++;
          add_tr(tr_counter,
          table_values.input[i], 
          table_values.output[i], 
          '[add some notes]',
          table_values.note[i]);
       }
      }
    }
    fr.readAsText(this.files[0]);
    e.target.value= '';
  }
  else{
    add_div('Error 200','Wrong format! Upload the table with txt format!','error');
  }
});

// ok the log btn
let log_btn= document.getElementById('log-btn');
let log_cnt_cnt= document.getElementById('log-cnt-cnt');
let scroll_val= false;
log_btn.addEventListener('click', ()=>{
  scroll_val= !scroll_val;
  if(scroll_val){
    log_cnt_cnt.scrollBy({left:+window.innerWidth,behavior:"smooth"});
    log_btn.classList.add('rotate-180');
  }
  else if(!scroll_val){
    log_cnt_cnt.scrollBy({left:-window.innerWidth,behavior:"smooth"});
    log_btn.classList.remove('rotate-180');
  }
});

// ok the cheat stuff
// ok the log-2
// ok the farsi stuff
let block_val;
let text_val_array;
let li_counter;
function fix_farsi(elm){
  let val= (elm.tagName == 'TEXTAREA') ? elm.value.trim() : elm.value;
  if(farsi.test(val)){
    elm.classList.add('font-b-mitra', 'text-c-2', 'tracking-c-2', '[word-spacing:.05vw]', '[direction:rtl]');
  }
  else{
    elm.classList.remove('font-b-mitra', 'text-c-2', 'tracking-c-2', '[word-spacing:.05vw]', '[direction:rtl]');
  }
}
function fix_farsi_2(elm){
  let val= (elm.tagName == 'TEXTAREA') ? elm.value.trim() : elm.value;
  if(val == ''){
    elm.classList.remove('font-b-mitra', 'text-c-2', 'tracking-c-2', '[word-spacing:.05vw]', '[direction:rtl]');
  }
  else{
    if(farsi.test(val)){
      elm.classList.add('font-b-mitra', 'text-c-2', 'tracking-c-2', '[word-spacing:.05vw]', '[direction:rtl]');
    }
    else{
      elm.classList.remove('font-b-mitra', 'text-c-2', 'tracking-c-2', '[word-spacing:.05vw]', '[direction:rtl]');
    }
  }
}
// Isolated
// the first letter is isolated
// at least ... 2 ... characters
let pattern_isolated_first=
/^[آادذرزژو][آـابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ]+$/;
// the middle letter is isolated
// this one: [آادذرزژو]+
// at least ... 3 ... characters
let pattern_isolated_middle=
/^[آـابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ]*[آادذرزژو][آادذرزژو]+[آـابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ]+$/;
// the last letter is isolated
// at least ... 2 ... characters
let pattern_isolated_last=
/^[آـابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ]*[آادذرزژو][آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ]$/;
// the only one letter is isolated
// at least ... 1 ... character
let pattern_isolated_only=
/^[آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ]$/;
// Initial
// the first letter is initial
// at least ... 2 ... characters
let pattern_initial_first=
/^[آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ][آـابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ]+$/;
// the middle letter is initial
// this one: [آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ]
// at least ... 3 ... characters
let pattern_initial_middle=
/^[آـابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ]*[آادذرزژو][آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ][آـابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ]+$/;
// the last letter is initial
// at least ... 2 ... characters
let pattern_initial_last=
/^[آـابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ]*[آادذرزژو][آادذرزژو]$/;
// the only one letter is initial
// at least ... 1 ... character
let pattern_initial_only=
/^[آادذرزژو]$/;
// Final
// the last letter is final
// at least ... 2 ... characters
let pattern_final=
/^[آـابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ]*[بـپتثجچحخسشصضطظعغفقکگلمنهیئ][آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ]$/;
// Medial
// the middle letter is medial
// this one: [آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ]
// at least ... 3 ... characters
let pattern_medial=
/^[آـابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ]*[بـپتثجچحخسشصضطظعغفقکگلمنهیئ][آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ][آـابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ][آـابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ]*$/;
// Farsi character sets
let normal_without_kashida_farsi= 'آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ';
let normal_with_kashida_farsi= 'آـابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ';
let special_farsi= 'آادذرزژو';
let unspecial_without_kashida_farsi= 'بپتثجچحخسشصضطظعغفقکگلمنهیئ';
let unspecial_with_kashida_farsi= 'بـپتثجچحخسشصضطظعغفقکگلمنهیئ';
let marks_farsi= '.:،؟!/؛«»';
let zwnj_farsi= '‌';
let farsi_space= ' ';
let word_counter= 0;
function sub_word_analyzer(sub_word){
  let text_array=[];
  // isolated_first!
  if(pattern_isolated_first.test(sub_word)){
    text_array.push({index: 0, character: `${sub_word.charAt(0)}`, type:`isolated`});
  }
  // isolated_middle!
  if(pattern_isolated_middle.test(sub_word)){
    for(let i=0; i<special_farsi.length; i++){
      for(let j=0; j<special_farsi.length; j++){
        for(let k=0; k<sub_word.length-2; k++){
          let sub_str= `${sub_word[k]}${sub_word[k+1]}`;
          let sub_pattern= `${special_farsi[i]}${special_farsi[j]}`;
          if(sub_str == sub_pattern){
            text_array.push({index: k+1, character: `${sub_word.charAt(k+1)}`, type:`isolated`});
          }
        }
      }
    }
  }
  // isolated_last!
  if(pattern_isolated_last.test(sub_word)){
    text_array.push({index: sub_word.length-1, character: `${sub_word.charAt(sub_word.length-1)}`, type:`isolated`});
  }
  // isolated_only!
  if(pattern_isolated_only.test(sub_word)){
    text_array.push({index: 0, character: `${sub_word.charAt(0)}`, type:`isolated`});
  }
  // initial_first!
  if(pattern_initial_first.test(sub_word)){
    let flag;
    for(let i=0; i<special_farsi.length; i++){
      flag=0;
      // special
      if(special_farsi[i] == sub_word.charAt(0)){
        text_array.push({index: 0, character: `${sub_word.charAt(0)}`, type:`initial`});
        flag=1;
        break;
      }
    }
    // unspecial
    if(flag == 0){
      text_array.push({index: 0, character: `${sub_word.charAt(0)}ـ`, type:`initial`});
    }
  }
  // initial_middle!
  if(pattern_initial_middle.test(sub_word)){
    for(let i=0; i<special_farsi.length; i++){
      for(let j=0; j<normal_without_kashida_farsi.length; j++){
        for(let k=0; k<normal_with_kashida_farsi.length; k++){
          for(let l=0; l<sub_word.length-2; l++){
            let sub_str= `${sub_word[l]}${sub_word[l+1]}${sub_word[l+2]}`;
            let sub_pattern=`${special_farsi[i]}${normal_without_kashida_farsi[j]}${normal_with_kashida_farsi[k]}`;
            if(sub_str == sub_pattern){
              let flag;
              for(let i=0; i<special_farsi.length; i++){
                flag=0;
                // special
                if(special_farsi[i] == sub_word.charAt(l+1)){
                  text_array.push({index: l+1, character: `${sub_word.charAt(l+1)}`, type:`initial`});
                  flag=1;
                  break;
                }
              }
              // unspecial
              if(flag == 0){
                text_array.push({index: l+1, character: `${sub_word.charAt(l+1)}ـ`, type:`initial`});
              }
            }
          }
        }
      }
    }
  }
  // initial_last!
  if(pattern_initial_last.test(sub_word)){
    for(let i=0; i<special_farsi.length; i++){
      for(let j=0; j<special_farsi.length; j++){
        let sub_str= `${sub_word[sub_word.length-2]}${sub_word[sub_word.length-1]}`;
        let sub_pattern= `${special_farsi[i]}${special_farsi[j]}`;
        if(sub_str == sub_pattern){
          text_array.push({index: sub_word.length-1, character: `${sub_word.charAt(sub_word.length-1)}`, type:`initial`});
        }
      }
    }
  }
  // isolated_only!
  if(pattern_initial_only.test(sub_word)){
    text_array.push({index: 0, character: `${sub_word.charAt(0)}`, type:`initial`});
  }
  // final!
  if(pattern_final.test(sub_word)){
    let flag= 0;
    for(let i=0; i<special_farsi.length; i++){
      if(sub_word.charAt(sub_word.length-1) == special_farsi[i]){
        text_array.push({index: sub_word.length-1, character: `ـ${sub_word.charAt(sub_word.length-1)}`, type:`medial, final`});
        flag=1;
        break;
      }
    }
    if(flag == 0){
        text_array.push({index: sub_word.length-1, character: `ـ${sub_word.charAt(sub_word.length-1)}`, type:`final`});
    }
  }
  // medial!
  if(pattern_medial.test(sub_word)){
    for(let i=0; i<unspecial_with_kashida_farsi.length; i++){
      for(let j=0; j<normal_without_kashida_farsi.length; j++){
        for(let k=0; k<normal_with_kashida_farsi.length; k++){
          for(let l=0; l<sub_word.length-2; l++){
            let sub_str= `${sub_word[l]}${sub_word[l+1]}${sub_word[l+2]}`;
            let sub_pattern=`${unspecial_with_kashida_farsi[i]}${normal_without_kashida_farsi[j]}${normal_with_kashida_farsi[k]}`;
            if(sub_str == sub_pattern){
              let flag;
              for(let i=0; i<special_farsi.length; i++){
                flag=0;
                // special
                if(special_farsi[i] == sub_word.charAt(l+1)){
                  text_array.push({index: l+1, character: `ـ${sub_word.charAt(l+1)}`, type:`medial, final`});
                  flag=1;
                  break;
                }
              }
              // unspecial
              if(flag == 0){
                text_array.push({index: l+1, character: `ـ${sub_word.charAt(l+1)}ـ`, type:`medial`});
              }
            }
          }
        }
      }
    }
  }
  // kashida/number!
  for(let i=0; i<sub_word.length; i++){
    if(sub_word[i] == 'ـ'){
      text_array.push({index: i, character: `${sub_word.charAt(i)}`, type:`kashida`});
    }
    if(farsi_number.test(sub_word[i])){
      text_array.push({index: i, character: `${sub_word.charAt(i)}`, type:`number`});
    }
  }
  // the end!
  return text_array;
}
// find words, split by space
function example_analyzer(example){
  for(let i=0; i<example.split(farsi_space).length; i++){
    text_val_array= [];
    // new word!
    word_counter++;
    // each word
    let word= example.split(farsi_space)[i];
    // zwnj-free word
    let zwnj_free_word= word.replace(/[‌]+/g, '');
    // analyzed word array
    let analyzed_word_array= [];
    // sub word counter, split by zwnj
    let sub_word_counter= 0;
    // duplicate counter
    let duplicate_counter= 0;
    // duplicate array
    let duplicate_array= [];
    // mark(s) with their indexes
    let mark_array= [];
    // sort the index(es)
    let index_counter= -1;
    // define the farsi space
    let auxiliary_counter= 0;
    // find marks with their indexes, don't consider zwnj's
    for(let i=0; i<zwnj_free_word.length; i++){
      for(let j=0; j<marks_farsi.length; j++){
        if(zwnj_free_word[i] == marks_farsi[j]){
          mark_array.push({index: i, character: zwnj_free_word[i]});
        }
      }
    }
    // replace any mark with zwnj
    for(let i=0; i<word.length; i++){
      for(let j=0; j<marks_farsi.length; j++){
        if(word[i] == marks_farsi[j]){
          word= word.replace(word[i], zwnj_farsi);
        }
      }
    }
    // find sub word(s), split by zwnj
    for(let i=0; i<word.split(zwnj_farsi).length; i++){
      let sub_word= word.split(zwnj_farsi)[i];
      // be sure to not equal to ''
      if(sub_word.length != 0){
        sub_word_counter++;
        let analyzed_sub_word_array= sub_word_analyzer(sub_word);
        analyzed_sub_word_array.sort(function(x,y){
          return x.index-y.index;
        });
        analyzed_sub_word_array.forEach(obj => {
          analyzed_word_array.push({index: obj.index, character: obj.character, type: obj.type, sub_id: sub_word_counter, id: word_counter});
          auxiliary_counter++;
        });
      }
    }
    if(i != example.split(farsi_space).length-1){
      analyzed_word_array.push({index: auxiliary_counter, character: farsi_space, type: 'farsi_space', sub_id: sub_word_counter, id: word_counter});
    }
    // optimize the duplicate one(s)
    analyzed_word_array.sort(function(x,y){
      if(x.index == y.index && x.character == y.character && x.sub_id == y.sub_id && x.id == y.id){
        x.duplicate= true;
        y.duplicate= true;
        x.type= `initial, isolated`;
        y.type= `initial, isolated`;
      }
    });
    // find the duplicate index(es)
    for(let i=0; i<analyzed_word_array.length; i++){
      if(analyzed_word_array[i].duplicate){
        duplicate_counter++;
        if(duplicate_counter%2 == 0){
          duplicate_array.push(i);
        }
      }
    }
    // delete the duplicate one(s)
    duplicate_array.reverse();
    for(let i=0; i<duplicate_array.length; i++){
      analyzed_word_array.splice(duplicate_array[i], 1);
    }
    // inject mark object
    if(mark_array.length > 0){
      for(let j=0; j<mark_array.length; j++){
        let mark_obj= {duplicate: false, index: mark_array[j].index, character: mark_array[j].character, type: 'mark', sub_id: '0_o', id: word_counter};
        analyzed_word_array.splice(mark_array[j].index, 0, mark_obj);
      }
    }
    // sort the index(es)
    analyzed_word_array.forEach(obj => {
      index_counter++;
      obj.index= index_counter;
    });
    // result
    let flag;
    for(let i=0; i<analyzed_word_array.length; i++){
      for(let j=0; j<inputs.length; j++){
        flag= 0;
        if(analyzed_word_array[i].character == inputs[j].value){
          li_counter++;
          text_val_array.push(outputs[j].value);
          add_li(li_counter, analyzed_word_array[i].character, outputs[j].value);
          flag= 1;
          break;
        }
      }
      if(flag == 0){
        li_counter++;
        text_val_array.push('⬛');
        add_li(li_counter, analyzed_word_array[i].character, 'Not Defined');
        block_val++;
      }
    }
    if(default_btn.checked){
      for(let i=0; i<text_val_array.length; i++){
        text.textContent+= text_val_array[i] + ((i == example.length-1) ? '' : splitter.value);
      }
      add_div_2(example, text.textContent);
    }
    else if(reverse_btn.checked){
      for(let i=0; i<text_val_array.length; i++){
        if(example.split(farsi_space).length == 1){
          text.textContent= text_val_array[i] + ((i == 0) ? '' : splitter.value) + text.textContent;
        }
        else{
          text.textContent= text_val_array[i] + ((i == example.length-1) ? '' : splitter.value) + text.textContent;
        }
      }
      add_div_2(example, text.textContent);
    }
    if(farsi.test(text.textContent)){
      text.classList.add('font-b-mitra', 'text-c-2', 'tracking-c-2', '[word-spacing:.05vw]', '[direction:rtl]');
    }
  }
  if(block_val == 0){
    add_div('Code Converted','Thank you for choosing Persia Pack!','no-error');
  }
  else if (block_val != 0 && block_val != example.length){
    add_div('Error 901','Part(s) of the code not converted! Not defined!','error');
  }
  else if(block_val != 0 && block_val == example.length){
    add_div('Error 911','The whole code not converted! Not defined!','error');
  }
}
let type_btn= document.getElementsByClassName('type-btn');
let direction_btn= document.getElementsByClassName('direction-btn');
let submit_btn= document.getElementById('submit-btn');
let character_btn= document.getElementById('character-btn');
let string_btn= document.getElementById('string-btn');
let character_cnt= document.getElementById('character-cnt');
let string_cnt= document.getElementById('string-cnt');
let string_cnt_cnt= document.getElementById('string-cnt-cnt');
let text= document.getElementById('text');
let sub_text= document.getElementById('sub-text');
let default_btn= document.getElementById('default-btn');
let reverse_btn= document.getElementById('reverse-btn');
let splitter= document.getElementById('splitter');
let log_cnt_2= document.getElementById('log-cnt-2');
let normal_btn= document.getElementById('normal-btn');
let farsi_btn= document.getElementById('farsi-btn');
string_btn.addEventListener('click', ()=>{
  character_btn.nextElementSibling.children[0].classList.add('hidden');
  character_btn.checked= false;
  character_cnt.classList.remove('bg-gray-50');
  character_cnt.classList.add('bg-gray-200');
  character_cnt.readOnly= true;
  string_btn.nextElementSibling.children[0].classList.remove('hidden');
  string_cnt_cnt.classList.remove('bg-gray-200');
  string_cnt_cnt.classList.add('bg-gray-50');
  string_cnt.removeAttribute('readonly');
  string_cnt.focus();
});
character_btn.addEventListener('click', ()=>{
  string_btn.nextElementSibling.children[0].classList.add('hidden');
  string_btn.checked= false;
  string_cnt_cnt.classList.remove('bg-gray-50');
  string_cnt_cnt.classList.add('bg-gray-200');
  string_cnt.readOnly= true;
  character_btn.nextElementSibling.children[0].classList.remove('hidden');
  character_cnt.classList.remove('bg-gray-200');
  character_cnt.classList.add('bg-gray-50');
  character_cnt.removeAttribute('readonly');
  character_cnt.focus();
});
default_btn.addEventListener('click', ()=>{
  reverse_btn.nextElementSibling.children[0].classList.add('hidden');
  reverse_btn.checked= false;
  default_btn.nextElementSibling.children[0].classList.remove('hidden');
  default_btn.checked= true;
});
reverse_btn.addEventListener('click', ()=>{
  default_btn.nextElementSibling.children[0].classList.add('hidden');
  default_btn.checked= false;
  reverse_btn.nextElementSibling.children[0].classList.remove('hidden');
  reverse_btn.checked= true;
});
normal_btn.addEventListener('click', ()=>{
  farsi_btn.nextElementSibling.children[0].classList.add('hidden');
  farsi_btn.checked= false;
  normal_btn.nextElementSibling.children[0].classList.remove('hidden');
  normal_btn.checked= true;
});
farsi_btn.addEventListener('click', ()=>{
  normal_btn.nextElementSibling.children[0].classList.add('hidden');
  normal_btn.checked= false;
  farsi_btn.nextElementSibling.children[0].classList.remove('hidden');
  farsi_btn.checked= true;
});
function add_div_2(input, output){
  let farsi_classes= ['font-b-mitra', 'text-c-2', 'tracking-c-2', '[word-spacing:.05vw]', '[direction:rtl]'];
  let input_classes= (farsi.test(input)) ? farsi_classes : '';
  let output_classes= (farsi.test(output)) ? farsi_classes : '';
  log_cnt_2.insertAdjacentHTML('afterbegin' ,`
  <div class="flex border-b border-white h-c-17 bg-blue-100 hover:bg-blue-200 group transition-colors duration-100">
      <div class="w-2/5 relative">
        <div class="flex items-center h-full overflow-auto px-c-15">
          <div class="absolute w-c-15 inset-y-0 left-0 bg-blue-100 group-hover:bg-blue-200 transition-colors duration-100"></div>
          <div class="whitespace-nowrap flex-1 text-center${(input_classes[0]) ? ' '.concat(input_classes[0]) : ''}${(input_classes[1]) ? ' '.concat(input_classes[1]) : ''}${(input_classes[2]) ? ' '.concat(input_classes[2]) : ''}${(input_classes[3]) ? ' '.concat(input_classes[3]) : ''}${(input_classes[4]) ? ' '.concat(input_classes[4]) : ''}" id="file-name">${input}</div>
          <div class="absolute w-c-15 inset-y-0 right-0 bg-blue-100 group-hover:bg-blue-200 transition-colors duration-100"></div>
        </div>
      </div>
      <div class="w-2/5 relative border-l border-gray-100">
        <div class="flex items-center h-full overflow-auto px-c-15">
          <div class="absolute w-c-15 inset-y-0 left-0 bg-blue-100 group-hover:bg-blue-200 transition-colors duration-100"></div>
          <div class="whitespace-nowrap flex-1 text-center${(output_classes[0]) ? ' '.concat(output_classes[0]) : ''}${(output_classes[1]) ? ' '.concat(output_classes[1]) : ''}${(output_classes[2]) ? ' '.concat(output_classes[2]) : ''}${(output_classes[3]) ? ' '.concat(output_classes[3]) : ''}${(output_classes[4]) ? ' '.concat(output_classes[4]) : ''}" id="file-name">${output}</div>
          <div class="absolute w-c-15 inset-y-0 right-0 bg-blue-100 group-hover:bg-blue-200 transition-colors duration-100"></div>
        </div>
      </div>
      <div class="w-1/5 flex justify-center items-center border-l border-gray-100">${set_time()}</div>
    </div>`);
}
function add_li(number, input, output){
  let farsi_classes= ['font-b-mitra', 'text-c-2', 'tracking-c-2', '[word-spacing:.05vw]', '[direction:rtl]'];
  let input_classes= (farsi.test(input)) ? farsi_classes : '';
  let output_classes= (farsi.test(output)) ? farsi_classes : '';
  sub_text.insertAdjacentHTML('beforeend' ,`
  <li class="flex h-c-3 border-b border-c-gray-25 bg-gray-50 hover:bg-white group transition-colors duration-100">
    <div class="w-1/3 relative">
      <div class="flex items-center h-full overflow-auto px-c-15">
        <div class="absolute w-c-15 inset-y-0 left-0 bg-gray-50 group-hover:bg-white transition-colors duration-100"></div>
        <div class="flex-1 text-center">${number}</div>
        <div class="absolute w-c-15 inset-y-0 right-0 bg-gray-50 group-hover:bg-white transition-colors duration-100"></div>
      </div>
    </div>
    <div class="w-1/3 relative border-l border-c-gray-25">
      <div class="flex items-center h-full overflow-auto px-c-15">
        <div class="absolute w-c-15 inset-y-0 left-0 bg-gray-50 group-hover:bg-white transition-colors duration-100"></div>
        <div class="whitespace-nowrap flex-1 text-center${(input_classes[0]) ? ' '.concat(input_classes[0]) : ''}${(input_classes[1]) ? ' '.concat(input_classes[1]) : ''}${(input_classes[2]) ? ' '.concat(input_classes[2]) : ''}${(input_classes[3]) ? ' '.concat(input_classes[3]) : ''}${(input_classes[4]) ? ' '.concat(input_classes[4]) : ''}">${input}</div>
        <div class="absolute w-c-15 inset-y-0 right-0 bg-gray-50 group-hover:bg-white transition-colors duration-100"></div>
      </div>
    </div>
    <div class="w-1/3 relative border-l border-c-gray-25">
      <div class="flex items-center h-full overflow-auto px-c-15">
        <div class="absolute w-c-15 inset-y-0 left-0 bg-gray-50 group-hover:bg-white transition-colors duration-100"></div>
        <div class="whitespace-nowrap flex-1 text-center${(output_classes[0]) ? ' '.concat(output_classes[0]) : ''}${(output_classes[1]) ? ' '.concat(output_classes[1]) : ''}${(output_classes[2]) ? ' '.concat(output_classes[2]) : ''}${(output_classes[3]) ? ' '.concat(output_classes[3]) : ''}${(output_classes[4]) ? ' '.concat(output_classes[4]) : ''}">${output}</div>
        <div class="absolute w-c-15 inset-y-0 right-0 bg-gray-50 group-hover:bg-white transition-colors duration-100"></div>
      </div>
    </div>
  </li>`);
}
submit_btn.addEventListener('click', (e)=>{
  e.preventDefault();
  if(!character_btn.checked && !string_btn.checked){
    add_div('Error 500','Select one of the two types!','error');
  }
  else{
    if(character_btn.checked){
      li_counter= 0;
      text.textContent= '';
      text.classList.remove('font-b-mitra', 'text-c-2', 'tracking-c-2', '[word-spacing:.05vw]', '[direction:rtl]');
      sub_text.innerHTML= '';
      text_val_array= [];
      block_val= 0;
      if(character_cnt.value == ''){
        add_div('Error 501','The character input field is empty!','error');
      }
      else{
        if(tr_counter == 0){
          add_div('Error 511','No table found to read the data from!','error');
        }
        else{
          if(!normal_btn.checked && !farsi_btn.checked){
            add_div('Error 999','Select one of the two search methods!','error');
          }
          else{
            if(!default_btn.checked && !reverse_btn.checked){
              add_div('Error 600','Select one of the two directions!','error');
            }
            else{
              if(normal_btn.checked){
                let flag;
                for(let i=0; i<character_cnt.value.length; i++){
                  for(let j=0; j<inputs.length; j++){
                    flag= 0;
                    if(character_cnt.value[i] == inputs[j].value){
                      li_counter++;
                      text_val_array.push(outputs[j].value);
                      add_li(li_counter, character_cnt.value[i], outputs[j].value);
                      flag= 1;
                      break;
                    }
                  }
                  if(flag == 0){
                    li_counter++;
                    text_val_array.push('⬛');
                    add_li(li_counter, character_cnt.value[i], 'Not Defined');
                    block_val++;
                  }
                }
                if(block_val == 0){
                  add_div('Code Converted','Thank you for choosing Persia Pack!','no-error');
                }
                else if (block_val != 0 && block_val != character_cnt.value.length){
                  add_div('Error 601','Part(s) of the code not converted! Not defined!','error');
                }
                else if(block_val != 0 && block_val == character_cnt.value.length){
                  add_div('Error 611','The whole code not converted! Not defined!','error');
                }
                if(default_btn.checked){
                  for(let i=0; i<text_val_array.length; i++){
                    text.textContent+= text_val_array[i] + ((i == character_cnt.value.length-1) ? '' : splitter.value);
                  }
                  add_div_2(character_cnt.value, text.textContent);
                }
                else if(reverse_btn.checked){
                  for(let i=text_val_array.length-1; i>=0; i--){
                    text.textContent+= text_val_array[i] + ((i == 0) ? '' : splitter.value);
                  }
                  add_div_2(character_cnt.value, text.textContent);
                }
                if(farsi.test(text.textContent)){
                  text.classList.add('font-b-mitra', 'text-c-2', 'tracking-c-2', '[word-spacing:.05vw]', '[direction:rtl]');
                }
              }
              else if(farsi_btn.checked){
                if(!farsi.test(character_cnt.value)){
                  add_div('Error 899','The code not written in Farsi!','error');
                }
                else{
                  example_analyzer(character_cnt.value);
                }
              }
            }
          }
        }
      }
    }
    else if(string_btn.checked){
      li_counter= 0;
      text.textContent= '';
      text.classList.remove('font-b-mitra', 'text-c-2', 'tracking-c-2', '[word-spacing:.05vw]', '[direction:rtl]');
      sub_text.innerHTML= '';
      text_val_array= [];
      block_val= 0;
      if(string_cnt.value.trim() == ''){
        add_div('Error 510','The string input field is empty!','error');
      }
      else{
        if(tr_counter == 0){
          add_div('Error 511','No table found to read the data from!','error');
        }
        else{
          let flag= 0;
          for(let i=0; i<inputs.length; i++){
            if(string_cnt.value.trim() == inputs[i].value){
              li_counter++;
              text_val_array.push(outputs[i].value);
              add_li(li_counter, string_cnt.value.trim(), outputs[i].value);
              flag= 1;
              break;
            }
          }
          if(flag == 0){
            li_counter++;
            text_val_array.push('⬛');
            add_li(li_counter, string_cnt.value.trim(), 'Not Defined');
            block_val++;
          }
          if(block_val == 0){
            add_div('Code Converted','Thank you for choosing Persia PackX!','no-error');
          }
          else if(block_val != 0){
            add_div('Error 611','The whole code not converted! Not defined!','error');
          }
          text.textContent= text_val_array[0];
          add_div_2(string_cnt.value, text.textContent);
          if(farsi.test(text.textContent)){
            text.classList.add('font-b-mitra', 'text-c-2', 'tracking-c-2', '[word-spacing:.05vw]', '[direction:rtl]');
          }
        }
      }
    }
  }
});

// ok the table of content
let download_btn_1= document.getElementById('download-btn-1');
download_btn_1.addEventListener('click', ()=>{
  add_div('Table Downloaded','Upload`n fill in, to decode using 4-Farsi search method!','no-error');
});

// ok the table of content 2
let download_btn_2= document.getElementById('download-btn-2');
download_btn_2.addEventListener('click', ()=>{
  add_div('Table Downloaded','Upload`n fill in, to decode using Normal search method!','no-error');
});