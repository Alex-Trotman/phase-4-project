"""Initial migration

Revision ID: 9cdb40861124
Revises: 
Create Date: 2024-07-09 02:09:26.085244

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9cdb40861124'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('password', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('username')
    )
    op.create_table('categories',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_categories_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('habits',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('category_id', sa.Integer(), nullable=False),
    sa.Column('metric_type', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['category_id'], ['categories.id'], name=op.f('fk_habits_category_id_categories')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_habits_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('habit_logs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('habit_id', sa.Integer(), nullable=False),
    sa.Column('log_date', sa.DateTime(), nullable=False),
    sa.Column('status', sa.Boolean(), nullable=True),
    sa.Column('note', sa.Text(), nullable=True),
    sa.ForeignKeyConstraint(['habit_id'], ['habits.id'], name=op.f('fk_habit_logs_habit_id_habits')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('habit_data',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('log_id', sa.Integer(), nullable=False),
    sa.Column('habit_id', sa.Integer(), nullable=False),
    sa.Column('metric_value', sa.Float(), nullable=True),
    sa.Column('metric_text', sa.Text(), nullable=True),
    sa.ForeignKeyConstraint(['habit_id'], ['habits.id'], name=op.f('fk_habit_data_habit_id_habits')),
    sa.ForeignKeyConstraint(['log_id'], ['habit_logs.id'], name=op.f('fk_habit_data_log_id_habit_logs')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('habit_data')
    op.drop_table('habit_logs')
    op.drop_table('habits')
    op.drop_table('categories')
    op.drop_table('users')
    # ### end Alembic commands ###
