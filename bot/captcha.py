"""
A quick program to make captchas

Requires Python 3+
"""

import os
os.system("pip install captcha")
os.system("pip install git+https://github.com/Pycord-Development/pycord")

from captcha.image import ImageCaptcha
from discord.ext import commands
from discord.utils import get
import random

bot = commands.Bot(command_prefix="!")

CHARS = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
GUILD_ID = 866485146600341505 "If you want to use the captcha command in your server, replace this with your server id."

def create_captcha():
  captcha_list = [random.choice(CHARS) for x in range(10)]
  image = ImageCaptcha(width=280, height=90)
  data = image.generate("".join(captcha_list))
  image.write("".join(captcha_list), "CAPTCHA.png")
  return "".join(captcha_list)

  
@bot.slash_command(
  guild_ids=[GUILD_ID],
  aliases=['c', 'verify', 'v'],
)
async def captcha(ctx):
	captcha = create_captcha()
	attempts = 3
  file = discord.File(os.path.getabspath("CAPTCHA.png"))
	await ctx.respond(content="Please solve this captcha to get in.", file=file)
	
	while attempts != 0:
		msg = await bot.wait_for('message', check=lambda message: message.author == ctx.author)
		if msg.content == captcha:
			role = get(ctx.author.server.roles, name="Beta Tester")
			await bot.add_roles(ctx.author, role)
			return
		else:
			attempts -= 1
			await ctx.respond(f"You failed the captcha! You only have {attempts} attempts left!")
	await ctx.respond(f"You failed! Please execute this command again to get access to the server.")
	
bot.run(TOKEN)
