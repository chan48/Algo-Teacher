import Randompeople from './Randompeople';

var Chaining = {
  create: $('#chaining_create'),
  inputname: $('#chaining_input_name'),
  inputemail: $('#chaining_input_email'),
  crash_chaining: $('.crash_chaining'),
  table: [
    {
      hash: 5,
      list: [
        {
          name: '김미영',
          email: '김미영@gmail.com'
        },
        {
          name: '박지수',
          email: '박지수@gmail.com'
        }
      ]
    },
    {
      hash: 11,
      list: [
        {
          name: '김나나',
          email: '김나나@gmail.com'
        },
        {
          name: '류수진',
          email: '류수진@gmail.com'
        }
      ]
    },
    {
      hash: 28,
      list: [
        {
          name: '류한경',
          email: '류한경@gmail.com'
        },
        {
          name: '김태훈',
          email: '김태훈@gmail.com'
        }
      ]
    }
  ],
  // 초기화 함수
  init: function() {
    this.rendering();
    this.randomInput();
  },

  // 이벤트 함수
  event: function() {
    // 데이터 추가 로직 함수
    this.create.click(() => {
      var name = this.inputname.val();
      var email = this.inputemail.val();
      // 인풋 유효성 검사
      if(name == '' || email == '') {
        swal({
          type: "warning",
          title: "요소를 입력하세요.",
          timer: 1000,
          showConfirmButton: false
        });
        return;
      }
      // 인풋 박스 초기화
      this.randomInput();
      // 해시값 추출
      var loseloseHashCode = this.loseloseHashCode(name);

      // 해시값 존재 유무 확인을 위한 변수
      var boolean = false;

      /*
        현재 요소에 있는 배열을 돌면서 해시값과 동일한 값이 있는지 확인한다.
        있으면 true 없으면 false
      */

      // 요소가 있다면 몇번째 요소에 존재하는지
      var count = 0;

      for(var i = 0; i < this.table.length; i++) {
        if(loseloseHashCode == this.table[i].hash) {
          boolean = true;
          count = i; // 요소가 있는 위치를 가리킨다.
        }
      }

      if(boolean) { // 이미 존재하는 요소가 있다면 true 없으면 false

        // 이미 요소가 있는 경우,
        var bol = false;

        for(var j = 0; j < this.table[count].list.length; j++) { // count 번째 요소에서 배열을 반복한다.
          if(name == this.table[count].list[j].name) { // 입력받은 값과 동일한 값이 존재하는가 안하는가 확인한다.
            bol = true; // 존재한다면 true
          }
        }

        if(bol) { // 해당 해시값이 있고, 해시값안에 배열에 이름도 존재한다.

          swal({
            type: "warning",
            title: "충돌 발생!",
            text: "<h1>"+ name +"</h1><h2>이미 존재하는 이름입니다.</h2>",
            html: true,
            timer: 3000,
            showConfirmButton: false
          });
          this.renderingCreate(loseloseHashCode, name, 'alreay');
          return;
        } else {
          this.table[count].list.push({
            name: name,
            email: email
          });
          swal({
            type: "success",
            title: "정상적으로 추가되었어요!",
            timer: 2000,
            showConfirmButton: false
          });
          this.renderingCreate(loseloseHashCode, name)

        }
      } else {
        var bol = false;

        this.table.push({
          hash: loseloseHashCode,
          list: [{
            'name': name,
            'email': email
          }]
        })

        swal({
          type: "success",
          title: "정상적으로 추가되었어요!",
          timer: 2000,
          showConfirmButton: false
        });

        this.renderingCreate(loseloseHashCode, name)
      }

    })
  },


  /* utils */
  randomInput: function() {
    var value = Randompeople();
    this.inputname.val(value.name);
    this.inputemail.val(value.email);
  },

  loseloseHashCode: function(key) {
    var hash = 0;
    for(var i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % 37;
  },


  /* 랜더링 함수 */

  rendering: function() {
    this.crash_chaining.html('');
    var table = this.table.sort((a,b) => {
       return a.hash < b.hash ? -1 : a.hash > b.hash ? 1 : 0;
    });

    var str = '';

    for(var i = 0; i < this.table.length; i++) {
      this.crash_chaining.append('<div class="chaning'+" chaning_"+table[i].hash+'"><div class="hashvalue">'+table[i].hash+'</div><span class="link"></span class="link"></span>');
        for(var j = 0; j < table[i].list.length; j++) {
           $('.chaning_'+""+table[i].hash).append('<span class="linkitem">'+'<div class="hashbox"><div class="hashname">'+table[i].list[j].name+'</div><div class="hashemail">'+table[i].list[j].email+'</div></div></span><span class="link"></span>')
        }
      $('.chaning_'+""+table[i].hash).append('<span class="null">Null</span>')
    }
  },

  renderingCreate: function(hash, name, type) {
    this.crash_chaining.html('');
    var table = this.table.sort(function(a,b) {
      return a.hash < b.hash ? -1 : a.hash > b.hash ? 1 : 0;
    });

    var str = '';

    for(var i = 0; i < this.table.length; i++) {
      if(hash == table[i].hash) {
        if(type == 'alreay') {
          this.crash_chaining.append('<div class="chaning'+" chaning_"+table[i].hash+'"><div class="hashvalue" style="background-color: #f03e3e; font-weight: bold;">'+table[i].hash+'</div><span class="link"></span class="link"></span>');
        } else {
          this.crash_chaining.append('<div class="chaning'+" chaning_"+table[i].hash+'"><div class="hashvalue" style="background-color: #4B9BE1; font-weight: bold;">'+table[i].hash+'</div><span class="link"></span class="link"></span>');
        }
      } else {
        this.crash_chaining.append('<div class="chaning'+" chaning_"+table[i].hash+'"><div class="hashvalue">'+table[i].hash+'</div><span class="link"></span class="link"></span>');
      }
      for(var j = 0; j < table[i].list.length; j++) {

        if(table[i].list[j].name == name) {
          if(type == 'alreay') {
            $('.chaning_'+""+table[i].hash).append('<span class="linkitem">'+'<div class="hashbox"><div class="hashname" style="background-color: #f03e3e;">'+table[i].list[j].name+'</div><div class="hashemail">'+table[i].list[j].email+'</div></div></span><span class="link"></span>')
          } else {
            $('.chaning_'+""+table[i].hash).append('<span class="linkitem">'+'<div class="hashbox"><div class="hashname" style="background-color: #4B9BE1;">'+table[i].list[j].name+'</div><div class="hashemail">'+table[i].list[j].email+'</div></div></span><span class="link"></span>')
          }
        } else {
          $('.chaning_'+""+table[i].hash).append('<span class="linkitem">'+'<div class="hashbox"><div class="hashname">'+table[i].list[j].name+'</div><div class="hashemail">'+table[i].list[j].email+'</div></div></span><span class="link"></span>')
        }
      }

      $('.chaning_'+""+table[i].hash).append('<span class="null">Null</span>')
    }
  }
}

export default Chaining;
