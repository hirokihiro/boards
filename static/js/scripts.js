// ランダム表示機能
function showRandomQuote() {
    let quotes = document.querySelectorAll(".quote-text");
    if (quotes.length > 0) {
        let randomIndex = Math.floor(Math.random() * quotes.length);
        alert("ランダム名言: " + quotes[randomIndex].innerText);
    } else {
        alert("名言がありません！");
    }
}

// コピー機能
function copyQuote(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("コピーしました！");
    });
}

function copyToClipboard(button) {
    let quoteText = button.parentElement.querySelector(".quote-text").innerText;
    navigator.clipboard.writeText(quoteText).then(() => {
        button.innerText = "コピーしました！";  // ボタンのテキスト変更
        setTimeout(() => button.innerText = "コピー", 2000);  // 2秒後に戻す
    }).catch(err => {
        console.error("コピーに失敗しました", err);
        alert("コピーに失敗しました");
    });
}

// 🎙️ 音声再生（Speech Synthesis API）
function speakQuote(button) {
    let quoteText = button.parentElement.querySelector(".quote-text").innerText;
    let speech = new SpeechSynthesisUtterance(quoteText);
    
    // 声の設定（オプション）
    speech.lang = "ja-JP"; // 日本語
    speech.rate = 1.0; // 再生速度（1.0が普通）
    speech.pitch = 1.2; // 声の高さ（1.0が普通）

    window.speechSynthesis.speak(speech);
}

// 🌟 クリップボードにコピー + ボタン変更アニメーション
function copyToClipboard(button) {
    let quoteText = button.parentElement.querySelector(".quote-text").innerText;
    navigator.clipboard.writeText(quoteText).then(() => {
        button.innerText = "✅ コピーしました！";
        button.style.backgroundColor = "#4CAF50";  // 緑色に変更
        setTimeout(() => {
            button.innerText = "📋 コピー";
            button.style.backgroundColor = "";  // 元の色に戻す
        }, 2000);
    }).catch(err => {
        console.error("コピーに失敗しました", err);
        alert("コピーに失敗しました");
    });
}

// ⭐ お気に入り機能
function toggleFavorite(button) {
    let quoteItem = button.parentElement;
    let isFavorite = quoteItem.classList.toggle("favorite");

    if (isFavorite) {
        button.innerText = "🌟 お気に入り済み";
    } else {
        button.innerText = "⭐ お気に入り";
    }
}

function addLike(button) {
    let currentLikes = parseInt(button.innerText.match(/\d+/)[0], 10);
    button.innerText = `👍 いいね！（${currentLikes + 1}）`;
    button.style.color = "red"; // ボタンの色を変える
}


function startQuiz() {
    let quotes = document.querySelectorAll(".quote-text");
    if (quotes.length === 0) {
        alert("まだ名言が登録されていません！");
        return;
    }
    
    let randomIndex = Math.floor(Math.random() * quotes.length);
    let selectedQuote = quotes[randomIndex].innerText;
    let correctCharacter = quotes[randomIndex].nextElementSibling.innerText.replace("— ", "");

    let characters = [...new Set([...document.querySelectorAll(".quote-text + strong")].map(el => el.innerText))];
    let choices = characters.sort(() => Math.random() - 0.5).slice(0, 3);
    if (!choices.includes(correctCharacter)) choices[0] = correctCharacter;
    choices = choices.sort(() => Math.random() - 0.5);

    let userAnswer = prompt(`この名言を言ったのは誰？\n\n"${selectedQuote}"\n\n選択肢:\n1. ${choices[0]}\n2. ${choices[1]}\n3. ${choices[2]}`);
    
    if (choices[userAnswer - 1] === correctCharacter) {
        alert("🎉 正解！" + correctCharacter + " でした！");
    } else {
        alert("❌ 残念！正解は " + correctCharacter + " でした！");
    }
}


document.querySelectorAll(".like-button").forEach(button => {
    button.addEventListener("click", function() {
        let quoteId = this.getAttribute("data-id");
        let likeCountSpan = document.getElementById(`like-count-${quoteId}`);
        let currentLikes = parseInt(likeCountSpan.innerText);

        fetch(`/vote/${quoteId}/`, { method: "POST", headers: { "X-CSRFToken": "{{ csrf_token }}" } })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    likeCountSpan.innerText = currentLikes + 1;
                }
            });
    });
});