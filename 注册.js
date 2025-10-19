const labels = document.querySelectorAll(".form-control label");

labels.forEach((label) => {
  label.innerHTML = label.innerText
    .split("")
    .map(
      (letter, idx) =>
        `<span style="transition-delay:${idx * 50}ms">${letter}</span>`
    )
    .join("");
});

// 添加注册功能
document.addEventListener('DOMContentLoaded', function() {
  const registerForm = document.getElementById('registerForm');
  const messageDiv = document.getElementById('message');
  
  registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 获取表单数据
    const username = document.getElementById('username').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    
    // 简单验证
    if (!username || !phone || !password) {
      showMessage('请填写所有字段', 'error');
      return;
    }
    
    // 检查手机号格式
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      showMessage('请输入正确的手机号格式', 'error');
      return;
    }
    
    // 检查用户是否已存在
    if (localStorage.getItem(`user_${phone}`)) {
      showMessage('该手机号已注册，请直接登录', 'error');
      return;
    }
    
    // 创建用户对象
    const user = {
      username: username,
      phone: phone,
      password: password, // 注意：实际项目中密码需要加密存储
      registerTime: new Date().toISOString()
    };
    
    // 存储到localStorage
    localStorage.setItem(`user_${phone}`, JSON.stringify(user));
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // 显示成功消息
    showMessage('注册成功！正在跳转...', 'success');
    
    // 2秒后跳转到首页
    setTimeout(() => {
      window.location.href = './首页.html';
    }, 2000);
  });
  
  // 显示消息函数
  function showMessage(message, type) {
    messageDiv.textContent = message;
    messageDiv.style.color = type === 'error' ? 'red' : 'lightgreen';
    messageDiv.style.fontSize = '16px';
    
    // 3秒后清除消息
    setTimeout(() => {
      messageDiv.textContent = '';
    }, 3000);
  }
});